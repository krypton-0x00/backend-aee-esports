import jwt from "jsonwebtoken";

export default function generateJWT(email: string) {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
}
