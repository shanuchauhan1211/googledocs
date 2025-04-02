
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

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error(`JWT Verification Error: ${(error as Error).message}`);
  }
};
