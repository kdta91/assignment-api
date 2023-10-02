const mongoose = require("mongoose");
const db_uri = process.env.DB_URI;
const db_name = process.env.DB_NAME;

const db_connect = async () => {
  try {
    await mongoose.connect(`${db_uri}${db_name}`);
  } catch (error) {
    throw new Error("Database connection failed");
  }
};

module.exports = db_connect;
