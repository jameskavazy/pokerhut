import { z } from 'zod'
import isUsernameAvailable from "./isUsernameAvailable"

export const usernameSchema = z.object({
    usernameChange: z
                    .string()
                    .trim()
                    .min(3, "Username must be at least 3 characters in length.")
                    .regex(/^[a-zA-Z0-9.]+$/, {message: "Invalid username. Valid username characters are A-Z, 0-9 and the symbol \".\""})
                    .refine(async (username) => {
                        const isUsernameTaken = await isUsernameAvailable(username);  
                        return isUsernameTaken.length == 0;
                    }, "Username is already taken." )
                    .refine((username) => username !== "null", {
                        message: "Invalid username",
                    })
});

