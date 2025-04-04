
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export const createToken = (id: string, expiresIn?: null): string => {
  try {
    const options = expiresIn ? { expiresIn } : {};
    const token = jwt.sign({ _id: id }, SECRET_KEY, options);
    return token;
  } catch (error) {
    throw new Error(`JWT Creation Error: ${(error as Error).message}`);
  }
};

export function verifyToken(token: string): { _id: string } | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    if (typeof decoded === "object" && decoded._id) {
      return { _id: decoded._id }; 
    }
    return null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

