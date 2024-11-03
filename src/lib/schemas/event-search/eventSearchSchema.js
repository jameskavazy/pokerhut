import { z } from 'zod'

export const eventStringSearchSchema = z.string();
export const eventDateSearchSchema = z.string().date();