import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/database.js';

export async function getAnalyticsController(req: Request, res: Response, next: NextFunction) {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
    const end = new Date();
    const start = new Date(end); start.setDate(start.getDate() - days);
    const [total, resolved, messages, byCategory] = await Promise.all([
      prisma.ticket.count({ where: { createdAt: { gte: start, lte: end } } }),
      prisma.ticket.count({ where: { createdAt: { gte: start, lte: end }, status: { in: ['RESOLVED', 'CLOSED'] } } }),
      prisma.ticketMessage.findMany({ where: { createdAt: { gte: start, lte: end } }, select: { createdAt: true, senderType: true } }),
      prisma.ticket.groupBy({ by: ['category'], where: { createdAt: { gte: start, lte: end } }, _count: { _all: true } }),
    ]);
    const volume = Array.from({ length: days }, (_, index) => { const d = new Date(start); d.setDate(start.getDate() + index); const next = new Date(d); next.setDate(d.getDate() + 1); return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), tickets: messages.filter((m) => m.createdAt >= d && m.createdAt < next).length }; });
    res.json({ success: true, data: { totalTickets: total, resolutionRate: total ? Math.round((resolved / total) * 1000) / 10 : 0, volume, categories: byCategory.map((item) => ({ category: item.category, tickets: item._count._all, percentage: total ? Math.round((item._count._all / total) * 1000) / 10 : 0 })) } });
  } catch (error) { next(error); }
}
