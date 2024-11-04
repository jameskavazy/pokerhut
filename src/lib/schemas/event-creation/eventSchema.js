import { z } from 'zod'

//TODO some sort lib for blocking inappropriate language?

export const eventSchema = z.object({
    title: z.string()
            .trim()
            .min(3, "Title must contain at least three characters")
            .max(50, "Must not exceed 50 characters"),
            
    location: z.string().min(1, "Location must not be empty").max(35, "Must not exceed 35 characters"),
    datetime: z.string()
                .transform((time) => {
                    return time.endsWith('Z') ? time : `${time}Z`;
                })
                .refine(() => {
                    return z.string().datetime();
                }, { message: "Invalid date time" })
                .refine((date) => {
                        return new Date(date) > new Date();
                        }, {message: "Date cannot be in the past"}
                ),
    limit: z.enum(["Limit", "NoLimit"], {message: "Please select a valid limit"}),
    gameType:z.enum(["CashGame", "Tournament"], 
        {message: "Please select a valid game type"}),
    blinds: z.enum(["SB_010_BB_020", "SB_025_BB_050", "SB_050_BB_100", "SB_100_BB_200"], 
        {message: "Please select a valid blind level"}),
    id: z.optional(z.number()),
    hostId: z.optional(z.string()),
});


