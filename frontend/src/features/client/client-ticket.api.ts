import { getClientAccessToken } from './client-auth.storage';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';

export type ClientTicketStatus =
  | 'OPEN'
  | 'PENDING'
  | 'RESOLVED'
  | 'CLOSED';

export type ClientTicketPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

export type ClientTicketCategory =
  | 'BILLING'
  | 'TECHNICAL'
  | 'ACCOUNT'
  | 'SHIPPING'
  | 'GENERAL';

export type ClientTicketMessage = {
  id: string;
  senderType:
    | 'CUSTOMER'
    | 'AGENT'
    | 'AI'
    | 'SYSTEM';
  message: string;
  createdAt: string;
};

export type ClientTicketAttachment = {
  id?: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;
};

export type ClientTicket = {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: ClientTicketStatus;
  priority: ClientTicketPriority;
  category: ClientTicketCategory;
  createdAt: string;
  updatedAt: string;
  messages?: ClientTicketMessage[];
  attachments?: ClientTicketAttachment[];
};

export type CreateClientTicketInput = {
  subject: string;
  description: string;
  category: ClientTicketCategory;
  priority: ClientTicketPriority;
  attachments?: File[];
};

function getClientToken(): string {
  const token = getClientAccessToken();

  if (!token) {
    throw new Error(
      'Customer authentication required.',
    );
  }

  return token;
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  let result: {
    success?: boolean;
    message?: string;
    data?: T;
  };

  try {
    result = (await response.json()) as {
      success?: boolean;
      message?: string;
      data?: T;
    };
  } catch {
    throw new Error(
      'Unable to read server response.',
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        'Unable to complete request.',
    );
  }

  if (result.data === undefined) {
    throw new Error(
      'Server response does not contain data.',
    );
  }

  return result.data;
}

/**
 * Create a client ticket.
 *
 * Uses multipart/form-data so attachments can
 * be sent together with the ticket fields.
 */
export async function createClientTicket(
  data: CreateClientTicketInput,
): Promise<ClientTicket> {
  const token = getClientToken();

  const formData = new FormData();

  formData.append(
    'subject',
    data.subject.trim(),
  );

  formData.append(
    'description',
    data.description.trim(),
  );

  formData.append(
    'category',
    data.category,
  );

  formData.append(
    'priority',
    data.priority,
  );

  for (const file of data.attachments ?? []) {
    formData.append(
      'attachments',
      file,
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/client-tickets`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`,
      },

      /*
       * Do NOT manually set Content-Type here.
       * The browser automatically adds the multipart
       * boundary when FormData is used.
       */
      body: formData,
    },
  );

  return parseResponse<ClientTicket>(
    response,
  );
}

/**
 * Get all tickets belonging to the
 * currently authenticated client.
 */
export async function getClientTickets(
  search = '',
): Promise<ClientTicket[]> {
  const token = getClientToken();

  const trimmedSearch = search.trim();

  const query =
    trimmedSearch.length > 0
      ? `?search=${encodeURIComponent(
          trimmedSearch,
        )}`
      : '';

  const response = await fetch(
    `${API_BASE_URL}/client-tickets${query}`,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseResponse<ClientTicket[]>(
    response,
  );
}

/**
 * Get one ticket belonging to the
 * currently authenticated client.
 */
export async function getClientTicketById(
  ticketId: string,
): Promise<ClientTicket> {
  const token = getClientToken();

  const trimmedTicketId = ticketId.trim();

  if (!trimmedTicketId) {
    throw new Error(
      'Ticket ID is required.',
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/client-tickets/${encodeURIComponent(
      trimmedTicketId,
    )}`,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseResponse<ClientTicket>(
    response,
  );
}