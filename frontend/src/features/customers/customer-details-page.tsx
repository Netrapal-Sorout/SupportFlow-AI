import {
  ArrowLeft,
  Save,
  UserRound,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  getCustomer,
  updateCustomer,
  type CustomerRecord,
} from './customer.api';

export function CustomerDetailsPage() {
  const { customerId = '' } =
    useParams();

  const [customer, setCustomer] =
    useState<CustomerRecord | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    status:
      'ACTIVE' as
        | 'ACTIVE'
        | 'INACTIVE',
  });

  const [error, setError] =
    useState('');

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    if (!customerId) {
      setError(
        'Customer ID is missing.',
      );
      return;
    }

    setError('');

    void getCustomer(customerId)
      .then((data) => {
        setCustomer(data);

        setForm({
          name: data.name,
          email: data.email,
          company:
            data.company || '',
          status: data.status,
        });
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load customer',
        );
      });
  }, [customerId]);

  async function save(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!customerId) {
      setError(
        'Customer ID is missing.',
      );
      return;
    }

    setError('');
    setSaved(false);

    try {
      const updatedCustomer =
        await updateCustomer(
          customerId,
          form,
        );

      setCustomer(
        updatedCustomer,
      );

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 1800);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save customer',
      );
    }
  }

  /* =========================================================
     LOADING / ERROR
  ========================================================= */

  if (!customer) {
    return (
      <div className="sf-page">
        <div className="sf-page__inner">

          {error ? (
            <div className="sf-alert">
              {error}
            </div>
          ) : (
            <div className="sf-empty">
              Loading customer…
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="sf-page customer-detail-page">

      <div className="sf-page__inner sf-stack">

        {/* ===================================================
            BACK TO CUSTOMERS
        =================================================== */}

        <Link
          className="sf-back"
          to="/admin/customers"
        >
          <ArrowLeft size={15} />
          Back to Customers
        </Link>

        {/* ===================================================
            CUSTOMER HEADER
        =================================================== */}

        <header
          className="sf-card sf-page-header"
          style={{
            padding: '18px 20px',
          }}
        >
          <div className="sf-header-title">

            <div className="sf-avatar">
              <UserRound size={15} />
            </div>

            <div>
              <h1 className="sf-heading">
                {customer.name}
              </h1>

              <p className="sf-subheading">
                {customer.email}
                {' · '}
                {customer.company ||
                  'No company'}
              </p>
            </div>

          </div>
        </header>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="sf-alert">
            {error}
          </div>
        )}

        {/* ===================================================
            DETAILS GRID
        =================================================== */}

        <div className="sf-detail-grid">

          {/* =================================================
              CUSTOMER PROFILE
          ================================================= */}

          <form
            className="sf-card"
            onSubmit={save}
          >
            <div className="sf-card__header">

              <div className="sf-section-title">
                Customer profile
              </div>

            </div>

            <div className="sf-card__body sf-stack">

              {/* NAME */}

              <div>
                <label className="sf-label">
                  Name
                </label>

                <input
                  className="sf-input"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name:
                        event.target.value,
                    })
                  }
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="sf-label">
                  Email
                </label>

                <input
                  className="sf-input"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email:
                        event.target.value,
                    })
                  }
                />
              </div>

              {/* COMPANY */}

              <div>
                <label className="sf-label">
                  Company
                </label>

                <input
                  className="sf-input"
                  value={form.company}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      company:
                        event.target.value,
                    })
                  }
                />
              </div>

              {/* STATUS */}

              <div>
                <label className="sf-label">
                  Status
                </label>

                <select
                  className="sf-select"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status:
                        event.target
                          .value as
                          | 'ACTIVE'
                          | 'INACTIVE',
                    })
                  }
                >
                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="INACTIVE">
                    Inactive
                  </option>
                </select>
              </div>

            </div>

            {/* =================================================
                FORM ACTIONS
            ================================================= */}

            <div className="sf-form-actions">

              <button
                type="submit"
                className="sf-button sf-button--primary"
              >
                <Save size={15} />
                Save Changes
              </button>

              {saved && (
                <span
                  style={{
                    fontSize: 12,
                    color: '#087f7c',
                  }}
                >
                  Saved
                </span>
              )}

            </div>

          </form>

          {/* =================================================
              TICKET HISTORY
          ================================================= */}

          <section className="sf-card">

            <div className="sf-card__header">

              <div className="sf-section-title">
                Ticket history
              </div>

            </div>

            <div className="sf-card__body">

              {customer.tickets &&
              customer.tickets.length > 0 ? (
                customer.tickets.map(
                  (ticket) => (
                    <Link
                      key={ticket.id}
                      to={`/admin/tickets/${ticket.id}`}
                      className="sf-detail-row"
                    >

                      <span>
                        <b
                          style={{
                            color:
                              '#0878d9',
                          }}
                        >
                          {
                            ticket.ticketNumber
                          }
                        </b>

                        <br />

                        {ticket.subject}
                      </span>

                      <span
                        className={`sf-pill sf-status--${ticket.status.toLowerCase()}`}
                      >
                        {ticket.status}
                      </span>

                    </Link>
                  ),
                )
              ) : (
                <div className="sf-empty">
                  No tickets for this
                  customer.
                </div>
              )}

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}