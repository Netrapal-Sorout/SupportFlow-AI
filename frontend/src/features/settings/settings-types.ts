export interface UserProfile {
  name: string;
  email: string;
  role: string;
  timezone: string;
}

export interface WorkspaceSettings {
  name: string;
  email: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  ticketAssignments: boolean;
  ticketReplies: boolean;
  aiAlerts: boolean;
  weeklyReports: boolean;
}

export interface AISettings {
  aiEnabled: boolean;
  autoClassification: boolean;
  suggestedReplies: boolean;
  autoSummaries: boolean;
  humanApprovalRequired: boolean;
  confidenceThreshold: number;
}