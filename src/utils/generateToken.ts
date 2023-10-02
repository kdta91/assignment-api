const jwt = require("jsonwebtoken");

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
