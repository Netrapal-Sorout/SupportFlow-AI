import type { NextFunction, Request, Response } from 'express';
import { customerSchema } from '../schemas/customer.schema.js';
import { createNewCustomer, getCustomer, getCustomers, updateExistingCustomer } from '../services/customer.service.js';

export async function listCustomersController(req: Request, res: Response, next: NextFunction) {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined;
    res.json({ success: true, data: await getCustomers(search) });
  } catch (error) { next(error); }
}

export async function getCustomerController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const customer = await getCustomer(id);
    if (!customer) { res.status(404).json({ success: false, message: 'Customer not found' }); return; }
    res.json({ success: true, data: customer });
  } catch (error) { next(error); }
}

export async function createCustomerController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = customerSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, message: 'Invalid customer data', errors: parsed.error.flatten() }); return; }
    res.status(201).json({ success: true, data: await createNewCustomer(parsed.data) });
  } catch (error) { next(error); }
}

export async function updateCustomerController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = customerSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, message: 'Invalid customer data', errors: parsed.error.flatten() }); return; }
    res.json({ success: true, data: await updateExistingCustomer(String(req.params.id), parsed.data) });
  } catch (error) { next(error); }
}
