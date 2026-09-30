import {
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';

import { AppShell } from '../components/layout/app-shell';

// =========================================================
// ADMIN AUTH
// =========================================================

import AuthPage from '../features/auth/auth-page';
import { ProtectedRoute } from '../features/auth/protected-route';

// =========================================================
// CLIENT AUTH + PORTAL
// =========================================================

import ClientAuthPage from '../features/client/client-auth-page';

import {
  ClientProtectedRoute,
} from '../features/client/client-protected-route';

import {
  ClientShell,
} from '../features/client/client-shell';

import {
  ClientDashboardPage,
} from '../features/client/client-dashboard-page';

import {
  ClientTicketsPage,
} from '../features/client/client-tickets-page';

import {
  ClientCreateTicketPage,
} from '../features/client/client-create-ticket-page';

import {
  ClientTicketDetailsPage,
} from '../features/client/client-ticket-details-page';

import {
  ClientHelpCenterPage,
} from '../features/client/client-help-center-page';

import {
  ClientAISupportPage,
} from '../features/client/client-ai-support-page';

// =========================================================
// ADMIN PAGES
// =========================================================

import {
  DashboardPage,
} from '../features/dashboard-page';

import {
  CreateTicketPage,
} from '../features/tickets/create-ticket-page';

import {
  TicketDetailsPage,
} from '../features/tickets/ticket-details-page';

import {
  TicketsPage,
} from '../features/tickets/tickets-page';

import {
  CustomersPage,
} from '../features/customers/customers-page';

import {
  CustomerDetailsPage,
} from '../features/customers/customer-details-page';

import {
  CreateCustomerPage,
} from '../features/customers/create-customer-page';

import {
  KnowledgeBasePage,
} from '../features/knowledge-base/knowledge-base-page';

import {
  ArticleDetailsPage,
} from '../features/knowledge-base/article-details-page';

import {
  CreateArticlePage,
} from '../features/knowledge-base/create-article-page';

import {
  AIAssistantPage,
} from '../features/ai-assistant/ai-assistant-page';

import {
  AnalyticsPage,
} from '../features/analytics/analytics-page';

import {
  SettingsPage,
} from '../features/settings/settings-page';

// =========================================================
// ROUTER
// =========================================================

export const router = createBrowserRouter([
  // =======================================================
  // CLIENT AUTHENTICATION
  // =======================================================

  {
    path: '/',
    element: <ClientAuthPage />,
  },

  {
    path: '/register',
    element: <ClientAuthPage />,
  },

  // =======================================================
  // CLIENT PORTAL
  // =======================================================

  {
    element: <ClientProtectedRoute />,

    children: [
      {
        path: '/portal',

        element: <ClientShell />,

        children: [
          // -------------------------------------------------
          // /portal
          // -------------------------------------------------

          {
            index: true,
            element: <ClientDashboardPage />,
          },

          // -------------------------------------------------
          // /portal/tickets
          // -------------------------------------------------

          {
            path: 'tickets',
            element: <ClientTicketsPage />,
          },

          // -------------------------------------------------
          // /portal/tickets/new
          // -------------------------------------------------

          {
            path: 'tickets/new',
            element: <ClientCreateTicketPage />,
          },

          // -------------------------------------------------
          // /portal/tickets/:ticketId
          // -------------------------------------------------

          {
            path: 'tickets/:ticketId',
            element: <ClientTicketDetailsPage />,
          },

          // -------------------------------------------------
          // /portal/help-center
          // -------------------------------------------------

          {
            path: 'help-center',
            element: <ClientHelpCenterPage />,
          },

          // -------------------------------------------------
          // /portal/ai-support
          // -------------------------------------------------

          {
            path: 'ai-support',
            element: <ClientAISupportPage />,
          },
        ],
      },
    ],
  },

  // =======================================================
  // ADMIN AUTHENTICATION
  // =======================================================

  {
    path: '/admin/login',
    element: <AuthPage />,
  },

  {
    path: '/admin/register',
    element: <AuthPage />,
  },

  // =======================================================
  // ADMIN APPLICATION
  // =======================================================

  {
    path: '/admin',

    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),

    children: [
      // ---------------------------------------------------
      // /admin
      // ---------------------------------------------------

      {
        index: true,
        element: <DashboardPage />,
      },

      // ---------------------------------------------------
      // /admin/tickets
      // ---------------------------------------------------

      {
        path: 'tickets',
        element: <TicketsPage />,
      },

      // ---------------------------------------------------
      // /admin/tickets/new
      // ---------------------------------------------------

      {
        path: 'tickets/new',
        element: <CreateTicketPage />,
      },

      // ---------------------------------------------------
      // /admin/tickets/:ticketId
      // ---------------------------------------------------

      {
        path: 'tickets/:ticketId',
        element: <TicketDetailsPage />,
      },

      // ---------------------------------------------------
      // /admin/customers
      // ---------------------------------------------------

      {
        path: 'customers',
        element: <CustomersPage />,
      },

      // ---------------------------------------------------
      // /admin/customers/new
      // ---------------------------------------------------

      {
        path: 'customers/new',
        element: <CreateCustomerPage />,
      },

      // ---------------------------------------------------
      // /admin/customers/:customerId
      // ---------------------------------------------------

      {
        path: 'customers/:customerId',
        element: <CustomerDetailsPage />,
      },

      // ---------------------------------------------------
      // /admin/knowledge-base
      // ---------------------------------------------------

      {
        path: 'knowledge-base',
        element: <KnowledgeBasePage />,
      },

      // ---------------------------------------------------
      // /admin/knowledge-base/new
      // ---------------------------------------------------

      {
        path: 'knowledge-base/new',
        element: <CreateArticlePage />,
      },

      // ---------------------------------------------------
      // /admin/knowledge-base/:articleId
      // ---------------------------------------------------

      {
        path: 'knowledge-base/:articleId',
        element: <ArticleDetailsPage />,
      },

      // ---------------------------------------------------
      // /admin/ai-assistant
      // ---------------------------------------------------

      {
        path: 'ai-assistant',
        element: <AIAssistantPage />,
      },

      // ---------------------------------------------------
      // /admin/analytics
      // ---------------------------------------------------

      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },

      // ---------------------------------------------------
      // /admin/settings
      // ---------------------------------------------------

      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // =======================================================
  // OLD ADMIN URL COMPATIBILITY
  // =======================================================

  {
    path: '/login',
    element: (
      <Navigate
        to="/admin/login"
        replace
      />
    ),
  },

  {
    path: '/dashboard',
    element: (
      <Navigate
        to="/admin"
        replace
      />
    ),
  },

  {
    path: '/tickets',
    element: (
      <Navigate
        to="/admin/tickets"
        replace
      />
    ),
  },

  {
    path: '/tickets/new',
    element: (
      <Navigate
        to="/admin/tickets/new"
        replace
      />
    ),
  },

  {
    path: '/customers',
    element: (
      <Navigate
        to="/admin/customers"
        replace
      />
    ),
  },

  {
    path: '/customers/new',
    element: (
      <Navigate
        to="/admin/customers/new"
        replace
      />
    ),
  },

  {
    path: '/knowledge-base',
    element: (
      <Navigate
        to="/admin/knowledge-base"
        replace
      />
    ),
  },

  {
    path: '/knowledge-base/new',
    element: (
      <Navigate
        to="/admin/knowledge-base/new"
        replace
      />
    ),
  },

  {
    path: '/ai-assistant',
    element: (
      <Navigate
        to="/admin/ai-assistant"
        replace
      />
    ),
  },

  {
    path: '/analytics',
    element: (
      <Navigate
        to="/admin/analytics"
        replace
      />
    ),
  },

  {
    path: '/settings',
    element: (
      <Navigate
        to="/admin/settings"
        replace
      />
    ),
  },

  // =======================================================
  // UNKNOWN ROUTES
  // =======================================================

  {
    path: '*',
    element: (
      <Navigate
        to="/"
        replace
      />
    ),
  },
]);