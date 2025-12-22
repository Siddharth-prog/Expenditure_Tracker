import User from "../../models/user.model.js";
import {  comparePassword } from "../../utils/hash.js";


export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.passwordSet) throw new Error("Invalid credentials");
  if (!user.emailVerified) throw new Error("Verify your email");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return user;
};
