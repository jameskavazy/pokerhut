import { z } from 'zod'

export const eventSearchSchema = z.object({           
    location: z.string(),
});