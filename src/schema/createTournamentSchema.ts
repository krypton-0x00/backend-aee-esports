import z, { date } from "zod";

export const createTournamentSchema = z.object({
  name: z
    .string()
    .min(4, "Tournament name should be altleast 4 characters long")
    .max(100, "Tournament name is too long"),

  // logo: z.string(),
  orgName: z
    .string()
    .min(5, "Organization name should be altleast 5 characters long")
    .max(30, "Organization name is too long"),
  game: z.enum(["BGMI", "VALORANT"]),
  slots: z.number().min(1),
  unit: z.number().min(4).max(5),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
  visibility: z.enum(["PUBLIC", "HIDDEN"]),
  prizePool: z.number().min(0),
  registrationFee:z.number(),
  userId: z.string(),
 startDate: z.preprocess((val) => val instanceof Date ? val : new Date(val as string | number), z.date()),
 endDate: z.preprocess((val) => val instanceof Date ? val : new Date(val as string | number), z.date()),
});
