import {
  Plus,
  Search,
  Ticket as TicketIcon,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import {
  getTickets,
  type TicketRecord,
} from './ticket.api';

function label(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
}

export function TicketsPage() {
  const [tickets, setTickets] =
    useState<TicketRecord[]>([]);

  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState('ALL');

  const [priority, setPriority] =
    useState('ALL');

  const [error, setError] =
    useState('');

  const load = () => {
    setError('');

    void getTickets({
      search,
      status,
      priority,
    })
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load tickets',
        );
      });
  };

  useEffect(() => {
    load();
  }, [status, priority]);

  return (
    <div className="sf-page ticket-list-page">
      <div className="sf-page__inner sf-stack">

        {/* HEADER */}
        <header
          className="sf-card sf-page-header"
          style={{
            padding: '18px 20px',
          }}
        >
          <div className="sf-header-title">

            <div className="sf-icon-box">
              <TicketIcon size={18} />
            </div>

            <div>
              <h1 className="sf-heading">
                Tickets
              </h1>

              <p className="sf-subheading">
                Manage and resolve customer support requests.
              </p>
            </div>

          </div>

          {/* ADMIN CREATE TICKET */}
          <Link
            className="sf-button sf-button--primary"
            to="/admin/tickets/new"
          >
            <Plus size={16} />
            Create Ticket
          </Link>
        </header>

        {/* SEARCH / FILTERS */}
        <section className="sf-card">
          <div className="sf-toolbar">

            <div
              style={{
                display: 'flex',
                gap: 10,
                flex: 1,
              }}
            >
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
                  placeholder="Search ticket, customer or email…"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      load();
                    }
                  }}
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

            {/* STATUS */}
            <select
              className="sf-select"
              style={{
                width: 150,
              }}
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="ALL">
                All status
              </option>

              <option value="OPEN">
                Open
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="RESOLVED">
                Resolved
              </option>

              <option value="CLOSED">
                Closed
              </option>
            </select>

            {/* PRIORITY */}
            <select
              className="sf-select"
              style={{
                width: 150,
              }}
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >
              <option value="ALL">
                All priority
              </option>

              <option value="URGENT">
                Urgent
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="LOW">
                Low
              </option>
            </select>

          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="sf-alert">
            {error}
          </div>
        )}

        {/* TICKET TABLE */}
        <section className="sf-card sf-table-wrap">
          <table className="sf-table">

            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Assigned</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>

                  {/* TICKET */}
                  <td>
                    <Link
                      className="sf-link"
                      to={`/admin/tickets/${ticket.id}`}
                    >
                      {ticket.ticketNumber}
                    </Link>

                    <div
                      style={{
                        marginTop: 4,
                        color: '#17233f',
                        fontWeight: 600,
                      }}
                    >
                      {ticket.subject}
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td>
                    {ticket.customer.name}

                    <div
                      style={{
                        fontSize: 11,
                        color: '#98a2b3',
                        marginTop: 3,
                      }}
                    >
                      {ticket.customer.email}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`sf-pill sf-status--${ticket.status.toLowerCase()}`}
                    >
                      {label(ticket.status)}
                    </span>
                  </td>

                  {/* PRIORITY */}
                  <td>
                    <span
                      className={`sf-pill sf-priority--${ticket.priority.toLowerCase()}`}
                    >
                      {label(ticket.priority)}
                    </span>
                  </td>

                  {/* CATEGORY */}
                  <td>
                    {label(ticket.category)}
                  </td>

                  {/* ASSIGNED */}
                  <td>
                    {ticket.assignedUser?.name ||
                      'Unassigned'}
                  </td>

                  {/* UPDATED */}
                  <td>
                    {new Date(
                      ticket.updatedAt,
                    ).toLocaleString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {tickets.length === 0 && (
            <div className="sf-empty">
              No tickets found.
            </div>
          )}
        </section>

      </div>
    </div>
  );
}