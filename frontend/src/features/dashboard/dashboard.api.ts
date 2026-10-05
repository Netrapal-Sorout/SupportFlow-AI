import { getAccessToken } from '../auth/auth.storage';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export interface DashboardActivityPoint {
  date: string;
  label: string;
  customerMessages: number;
  agentMessages: number;
  total: number;
}

export interface DashboardData {
  period: {
    start: string;
    end: string;
    days: number;
  };
  summary: {
    openTickets: number;
    pendingTickets: number;
    resolvedTickets: number;
    closedTickets: number;
    highPriorityTickets: number;
    newTickets: number;
    aiResolutionRate: number | null;
  };
  activity: DashboardActivityPoint[];
  recentTickets: Array<{
    id: string;
    ticketNumber: string;
    subject: string;
    status: 'OPEN' | 'PENDING' | 'RESOLVED' | 'CLOSED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    customer: {
      id: string;
      name: string;
      email: string;
    };
    assignedUser: {
      id: string;
      name: string;
    } | null;
    updatedAt: string;
  }>;
}

interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export async function getDashboard(days = 7): Promise<DashboardData> {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/dashboard?days=${days}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = (await response.json()) as DashboardResponse & {
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || 'Unable to load dashboard');
  }

  return data.data;
}
