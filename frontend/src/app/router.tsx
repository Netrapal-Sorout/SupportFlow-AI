import { Navigate, createBrowserRouter } from 'react-router-dom';

import { AppShell } from '../components/layout/app-shell';

import LoginPage from '../features/auth/login-page';
import { ProtectedRoute } from '../features/auth/protected-route';

import { DashboardPage } from '../features/dashboard-page';

import { CreateTicketPage } from '../features/tickets/create-ticket-page';
import { TicketDetailsPage } from '../features/tickets/ticket-details-page';
import { TicketsPage } from '../features/tickets/tickets-page';

import { CustomersPage } from '../features/customers/customers-page';
import { CustomerDetailsPage } from '../features/customers/customer-details-page';
import { CreateCustomerPage } from '../features/customers/create-customer-page';

import { KnowledgeBasePage } from '../features/knowledge-base/knowledge-base-page';
import { ArticleDetailsPage } from '../features/knowledge-base/article-details-page';
import { CreateArticlePage } from '../features/knowledge-base/create-article-page';

import { AIAssistantPage } from '../features/ai-assistant/ai-assistant-page';
import { AnalyticsPage } from '../features/analytics/analytics-page';
import { SettingsPage } from '../features/settings/settings-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/tickets',
        element: <TicketsPage />,
      },
      {
        path: '/tickets/new',
        element: <CreateTicketPage />,
      },
      {
        path: '/tickets/:ticketId',
        element: <TicketDetailsPage />,
      },
      {
        path: '/customers',
        element: <CustomersPage />,
      },
      {
        path: '/customers/new',
        element: <CreateCustomerPage />,
      },
      {
        path: '/customers/:customerId',
        element: <CustomerDetailsPage />,
      },
      {
        path: '/knowledge-base',
        element: <KnowledgeBasePage />,
      },
      {
        path: '/knowledge-base/new',
        element: <CreateArticlePage />,
      },
      {
        path: '/knowledge-base/:articleId',
        element: <ArticleDetailsPage />,
      },
      {
        path: '/ai-assistant',
        element: <AIAssistantPage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);