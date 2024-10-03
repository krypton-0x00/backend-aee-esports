import z from "zod"
export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
  });
  