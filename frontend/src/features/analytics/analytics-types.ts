export interface AnalyticsStat {
  label: string;
  value: string;
  change: number;
  comparison: string;
}

export interface TicketVolumeData {
  label: string;
  tickets: number;
}

export interface TicketCategoryData {
  category: string;
  tickets: number;
  percentage: number;
}

export interface AIPerformanceData {
  metric: string;
  value: string;
  description: string;
}