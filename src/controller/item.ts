import { Request, Response, NextFunction } from "express";
import { Item } from "../model/item";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Item.find({}).exec();

    res.json({ items });
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Item.create(req.body);

    res.json({ message: "Item created" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItems, createItem };
