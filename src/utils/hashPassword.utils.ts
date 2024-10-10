import bcrypt from "bcryptjs";

export default function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
