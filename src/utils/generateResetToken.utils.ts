import crypto from "crypto";

export default function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}
