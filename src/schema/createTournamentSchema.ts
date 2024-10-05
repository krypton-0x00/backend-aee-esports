import z, { date } from "zod";

export const createTournamentSchema = z.object({
  name: z
    .string()
    .min(4, "Tournament name should be altleast 4 characters long")
    .max(100, "Tournament name is too long"),

  logo: z.string(),
  orgName: z
    .string()
    .min(5, "Organization name should be altleast 5 characters long")
    .max(30, "Organization name is too long"),
  game: z.enum(["BGMI", "VALORANT"]),
  slots: z.number(),
  unit: z.number().min(4).max(5),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
  visibility: z.enum(["PUBLIC", "HIDDEN"]),
  userId: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date()
});
