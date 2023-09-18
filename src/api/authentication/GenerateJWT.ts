import jwt from "jsonwebtoken";

export function generateJWT(
  payload: jwt.JwtPayload,
  signOptions: jwt.SignOptions,
  secretKey: string,
) {
  return jwt.sign(payload, secretKey, signOptions);
}
