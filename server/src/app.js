import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import expenseRoute from "./routes/expenseRoute.js"
import authRouter from "./routes/auth.js";
import monthlyRoute from "./routes/monthlyPlan.route.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import aiRoute from "./routes/aiRoutes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import gmailRouter from "./routes/gmail.routes.js"
import tripRoutes from "./routes/trip.route.js"
import "./config/passport.js";

import { corsConfig } from "./config/cors.js";

const app = express();

app.use(corsConfig);
app.options("*", corsConfig);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use("/api/auth", authRouter);
app.use("/api/gmail", gmailRouter) ;
app.use("/api/ai", aiRoute) ;
app.use("/api/expenses", expenseRoute)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/monthly-plan", monthlyRoute);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/trips", tripRoutes);


export default app;
