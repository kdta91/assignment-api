import { Schema, model, Types } from "mongoose";

interface User {
  email: string;
  password: string;
  money: Types.Decimal128;
}

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      match: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    money: {
      type: Types.Decimal128,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<User>("User", userSchema);
