import { apiRequest } from '../../services/api-client';
export interface AIAnalysis { ticketId?:string; category:string; priority:string; sentiment:string; confidence:number; summary:string; suggestedReply:string; provider:string; }
export async function analyzeTicket(input:{ticketId?:string;message?:string}) { return (await apiRequest<{success:boolean;data:AIAnalysis}>('/ai/analyze',{method:'POST',body:JSON.stringify(input)})).data; }
