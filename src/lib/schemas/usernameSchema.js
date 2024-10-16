import { z } from 'zod'
import isUsernameAvailable from "./isUsernameAvailable"

export const usernameSchema = z.object({
    usernameChange: z
                    .string()
                    .trim()
                    .min(3, "Username must be at least 3 characters in length.")
                //     .refine(async (usernameChange) => {
                //         const isAvailable = await isUsernameAvailable(usernameChange);
                //         return isAvailable;
                //     }
                // )
});

