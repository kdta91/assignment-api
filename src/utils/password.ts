const bcrypt = require("bcrypt");
const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  console.log("pw:", password);
  console.log("hashedPW:", hashedPassword);
  return bcrypt.compare(password, hashedPassword);
};
