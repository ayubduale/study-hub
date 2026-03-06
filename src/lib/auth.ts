import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-prod";

export type CustomJwtPayload = JwtPayload & { userId: number; email: string };

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { userId: number; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): CustomJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  } catch {
    return null;
  }
}
