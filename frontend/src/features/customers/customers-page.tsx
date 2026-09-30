import {
  Plus,
  Search,
  Users,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  getCustomers,
  type CustomerRecord,
} from './customer.api';

export function CustomersPage() {
  const [customers, setCustomers] =
    useState<CustomerRecord[]>([]);

  const [search, setSearch] =
    useState('');

  const [error, setError] =
    useState('');

  const load = () => {
    setError('');

    void getCustomers(search)
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load customers',
        );
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="sf-page customer-list-page">
      <div className="sf-page__inner sf-stack">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className="sf-card sf-page-header"
          style={{
            padding: '18px 20px',
          }}
        >
          <div className="sf-header-title">

            <div className="sf-icon-box">
              <Users size={18} />
            </div>

            <div>
              <h1 className="sf-heading">
                Customers
              </h1>

              <p className="sf-subheading">
                Real customer records linked to support tickets.
              </p>
            </div>

          </div>

          {/* ADMIN CREATE CUSTOMER */}

          <Link
            className="sf-button sf-button--primary"
            to="/admin/customers/new"
          >
            <Plus size={16} />
            Add Customer
          </Link>

        </header>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <section className="sf-card">

          <div className="sf-toolbar">

            <div
              style={{
                position: 'relative',
                maxWidth: 650,
                width: '100%',
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 12,
                  color: '#98a2b3',
                }}
              />

              <input
                className="sf-input"
                style={{
                  paddingLeft: 38,
                }}
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    load();
                  }
                }}
                placeholder="Search name, email or company…"
              />
            </div>

            <button
              type="button"
              className="sf-button"
              onClick={load}
            >
              Search
            </button>

          </div>

        </section>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="sf-alert">
            {error}
          </div>
        )}

        {/* =====================================================
            CUSTOMER TABLE
        ===================================================== */}

        <section className="sf-card sf-table-wrap">

          <table className="sf-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Status</th>
                <th>Tickets</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (
                <tr key={customer.id}>

                  {/* CUSTOMER */}

                  <td>
                    <Link
                      className="sf-link"
                      to={`/admin/customers/${customer.id}`}
                    >
                      {customer.name}
                    </Link>

                    <div
                      style={{
                        fontSize: 11,
                        color: '#98a2b3',
                        marginTop: 3,
                      }}
                    >
                      {customer.email}
                    </div>
                  </td>

                  {/* COMPANY */}

                  <td>
                    {customer.company || '—'}
                  </td>

                  {/* STATUS */}

                  <td>
                    <span
                      className="sf-pill"
                      style={{
                        background:
                          customer.status === 'ACTIVE'
                            ? '#eaf8f7'
                            : '#f2f4f7',

                        color:
                          customer.status === 'ACTIVE'
                            ? '#087f7c'
                            : '#667085',
                      }}
                    >
                      {customer.status === 'ACTIVE'
                        ? 'Active'
                        : 'Inactive'}
                    </span>
                  </td>

                  {/* TICKETS */}

                  <td>
                    {customer._count?.tickets ?? 0}
                  </td>

                  {/* UPDATED */}

                  <td>
                    {new Date(
                      customer.updatedAt,
                    ).toLocaleString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {customers.length === 0 && (
            <div className="sf-empty">
              No customers found.
            </div>
          )}

        </section>

      </div>
    </div>
  );
}