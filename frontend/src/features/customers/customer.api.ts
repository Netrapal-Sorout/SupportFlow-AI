import { apiRequest } from '../../services/api-client';
export interface CustomerRecord { id:string; name:string; email:string; company:string|null; status:'ACTIVE'|'INACTIVE'; createdAt:string; updatedAt:string; _count?:{tickets:number}; tickets?:Array<{id:string;ticketNumber:string;subject:string;status:string;priority:string;updatedAt:string}>; }
export async function getCustomers(search='') { return (await apiRequest<{success:boolean;data:CustomerRecord[]}>(`/customers${search?`?search=${encodeURIComponent(search)}`:''}`)).data; }
export async function getCustomer(id:string) { return (await apiRequest<{success:boolean;data:CustomerRecord}>(`/customers/${id}`)).data; }
export async function createCustomer(input:{name:string;email:string;company?:string}) { return (await apiRequest<{success:boolean;data:CustomerRecord}>('/customers',{method:'POST',body:JSON.stringify(input)})).data; }
export async function updateCustomer(id:string,input:{name:string;email:string;company?:string;status?:'ACTIVE'|'INACTIVE'}) { return (await apiRequest<{success:boolean;data:CustomerRecord}>(`/customers/${id}`,{method:'PATCH',body:JSON.stringify(input)})).data; }
