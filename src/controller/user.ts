import { Request, Response, NextFunction } from "express";
import { generateToken } from "../utils/generateToken";
import { hashPassword, comparePasswords } from "../utils/password";
import { User } from "../model/user";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({}).exec();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = await hashPassword(req.body.password);

    await User.create(req.body);

    res.json({ message: "Account created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const match = await comparePasswords(req.body.password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken({ email: req.body.email });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user;
    const amount = req.body.amount;

    if (amount <= 0)
      return res.json({ message: "Please deposit amount greater than 0" });

    await User.findOneAndUpdate(
      { email },
      {
        $inc: {
          money: amount,
        },
      }
    );

    res.json({ message: `${amount} deposit successful` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, register, login, deposit };
