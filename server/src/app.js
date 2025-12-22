import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import routes from "./routes.js";
import "./config/passport.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));

app.use(passport.initialize());
app.use("/api", routes);

export default app;
