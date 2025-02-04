import { z } from 'zod';

export const proSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    gender: z.enum(['male', 'female', 'other']),
    rank: z.number().optional(),
    earnings: z.number().positive(),
    created: z.string().datetime(),
    updated: z.string().datetime()
});


export const sponsorshipSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  growth: z.number(),
  date: z.string().datetime(),
  yearOne: z.number().positive(),
  yearTwo: z.number().positive(),
  yearThree: z.number().positive(),
  projectedGrowth: z.number(),
  chartData: z.array(z.object({
      month: z.string(),
      actual: z.number(),
      projected: z.number()
  })),
  created: z.string().datetime(),
  updated: z.string().datetime()
});

export const ticketSaleSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
  revenue: z.number().positive(),
  eventDate: z.string().datetime(),
  yearOneProjection: z.number().positive(),
  yearTwoProjection: z.number().positive(),
  yearThreeProjection: z.number().positive(),
  growthRate: z.number(),
  chartData: z.array(z.object({
      quarter: z.string(),
      sales: z.number(),
      projectedSales: z.number()
  })),
  created: z.string().datetime(),
  updated: z.string().datetime()
});
export const executiveStaffSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    role: z.string().min(2),
    created: z.string().datetime(),
    updated: z.string().datetime()
});

export const partnerSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    type: z.enum(['sponsor', 'vendor', 'media', 'technology']),
    website: z.string().url(),
    created: z.string().datetime(),
    updated: z.string().datetime()
});
