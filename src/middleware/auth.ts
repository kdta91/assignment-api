import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Authentication failed. Invalid token." });

    req.user = user;

    next();
  });
};
