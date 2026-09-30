import { createCustomer, findAllCustomers, findCustomerById, updateCustomer } from '../repositories/customer.repository.js';
import type { CustomerInput } from '../schemas/customer.schema.js';

export const getCustomers = (search?: string) => findAllCustomers(search);
export const getCustomer = (id: string) => findCustomerById(id);
export const createNewCustomer = (data: CustomerInput) => createCustomer(data);
export const updateExistingCustomer = (id: string, data: CustomerInput) => updateCustomer(id, data);
