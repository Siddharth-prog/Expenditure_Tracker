// src/api/auth.api.js
import api from "./axios";

export const login = (data) =>
  api.post("/auth/login", data);

export const register = (data) =>
  api.post("/auth/register", data);

export const googleAuth = (token) =>
  api.post("/auth/google", { token });

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

export const setPassword = (data) =>
  api.post("/auth/set-password", data);

export const resendVerification = (email) =>
  api.post("/auth/resend-verification", { email });