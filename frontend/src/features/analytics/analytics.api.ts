import { apiRequest } from '../../services/api-client';
export interface AnalyticsData { totalTickets:number; resolutionRate:number; volume:Array<{label:string;tickets:number}>; categories:Array<{category:string;tickets:number;percentage:number}>; }
export async function getAnalytics(days=7) { return (await apiRequest<{success:boolean;data:AnalyticsData}>(`/analytics?days=${days}`)).data; }
