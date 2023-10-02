import { Schema, model, Types } from "mongoose";

interface Item {
  name: string;
  startPrice: Types.Decimal128;
  timeWindow: string;
}

const itemSchema = new Schema<Item>(
  {
    name: {
      type: String,
      required: true,
    },
    startPrice: {
      type: Types.Decimal128,
      required: true,
    },
    timeWindow: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = model<Item>("Item", itemSchema);
