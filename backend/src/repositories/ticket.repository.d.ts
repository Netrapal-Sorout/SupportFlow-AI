export declare function findAllTickets(): Promise<({
    assignedUser: {
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    customer: {
        id: string;
        name: string;
        email: string;
        company: string | null;
        status: import("@prisma/client").$Enums.CustomerStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    ticketNumber: string;
    subject: string;
    status: import("@prisma/client").$Enums.TicketStatus;
    priority: import("@prisma/client").$Enums.TicketPriority;
    category: import("@prisma/client").$Enums.TicketCategory;
    lastMessage: string | null;
    aiConfidence: number | null;
    customerId: string;
    assignedUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare function findTicketById(id: string): Promise<({
    assignedUser: {
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    customer: {
        id: string;
        name: string;
        email: string;
        company: string | null;
        status: import("@prisma/client").$Enums.CustomerStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    messages: {
        id: string;
        content: string;
        senderType: import("@prisma/client").$Enums.MessageSenderType;
        ticketId: string;
        userId: string | null;
        createdAt: Date;
    }[];
} & {
    id: string;
    ticketNumber: string;
    subject: string;
    status: import("@prisma/client").$Enums.TicketStatus;
    priority: import("@prisma/client").$Enums.TicketPriority;
    category: import("@prisma/client").$Enums.TicketCategory;
    lastMessage: string | null;
    aiConfidence: number | null;
    customerId: string;
    assignedUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
//# sourceMappingURL=ticket.repository.d.ts.map