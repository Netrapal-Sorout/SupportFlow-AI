import { getClientAccessToken } from './client-auth.storage';

const API_BASE_URL =
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
};

/* =========================================================
   CREATE TICKET INPUT
========================================================= */

export type CreateClientTicketInput = {
  subject: string;

  description: string;

  category: ClientTicketCategory;

  priority: ClientTicketPriority;

  attachments?: File[];
};

/* =========================================================
   HEADERS
========================================================= */

function getClientHeaders(): HeadersInit {
  const token =
    getClientAccessToken();

  if (!token) {
    throw new Error(
      'Customer authentication required.',
    );
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/* =========================================================
   MULTIPART AUTH HEADERS
========================================================= */

function getClientAuthHeaders(): HeadersInit {
  const token =
    getClientAccessToken();

  if (!token) {
    throw new Error(
      'Customer authentication required.',
    );
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

/* =========================================================
   RESPONSE PARSER
========================================================= */

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  let result: {
    success?: boolean;
    message?: string;
    data?: T;
  };

  try {
    result =
      (await response.json()) as {
        success?: boolean;
        message?: string;
        data?: T;
      };
  } catch {
    throw new Error(
      'Unable to read server response.',
    );
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        'Unable to complete request.',
    );
  }

  if (
    result.data === undefined
  ) {
    throw new Error(
      'Server response does not contain data.',
    );
  }

  return result.data;
}

/* =========================================================
   CREATE CLIENT TICKET
========================================================= */

export async function createClientTicket(
  data: CreateClientTicketInput,
): Promise<ClientTicket> {
  const formData =
    new FormData();

  formData.append(
    'subject',
    data.subject,
  );

  formData.append(
    'description',
    data.description,
  );

  formData.append(
    'category',
    data.category,
  );

  formData.append(
    'priority',
    data.priority,
  );

  for (
    const file of
    data.attachments ?? []
  ) {
    formData.append(
      'attachments',
      file,
    );
  }

  const response =
    await fetch(
      `${API_BASE_URL}/client-tickets`,
      {
        method: 'POST',

        headers:
          getClientAuthHeaders(),

        body: formData,
      },
    );

  return parseResponse<ClientTicket>(
    response,
  );
}

/* =========================================================
   GET CLIENT TICKETS
========================================================= */

export async function getClientTickets(
  search = '',
): Promise<ClientTicket[]> {
  const query =
    search.trim().length > 0
      ? `?search=${encodeURIComponent(
          search.trim(),
        )}`
      : '';

  const response =
    await fetch(
      `${API_BASE_URL}/client-tickets${query}`,
      {
        method: 'GET',
        headers:
          getClientHeaders(),
      },
    );

  return parseResponse<
    ClientTicket[]
  >(response);
}

/* =========================================================
   GET CLIENT TICKET BY ID
========================================================= */

export async function getClientTicketById(
  ticketId: string,
): Promise<ClientTicket> {
  const response =
    await fetch(
      `${API_BASE_URL}/client-tickets/${encodeURIComponent(
        ticketId,
      )}`,
      {
        method: 'GET',
        headers:
          getClientHeaders(),
      },
    );

  return parseResponse<ClientTicket>(
    response,
  );
}