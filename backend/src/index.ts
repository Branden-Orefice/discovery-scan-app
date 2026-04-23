import dotenv from "dotenv";
import cors from "cors";
import path from "node:path";
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { auth } from "./lib/auth";
import http from "node:http";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

const staticPath = path.resolve(__dirname, "../../frontend/dist");
const BACKEND_PORT = process.env.BACKEND_PORT || 8000;

app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.DEVELOPMENT_URI,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );
}

app.get("/api/auth/callback/google", async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === "development") {
    const originalSetHeader = res.setHeader.bind(res);

    res.setHeader = function (name: string, value: any) {
      if (name.toLowerCase() === "location" && value && value.startsWith("/")) {
        const frontendUrl = process.env.DEVELOPMENT_URI;
        value = `${frontendUrl}${value}`;
      }
      return originalSetHeader(name, value);
    } as any;
  }

  await toNodeHandler(auth)(req, res);
});

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(staticPath));

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api")) return next();
    return res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Auth or API error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    error: error?.message ?? "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: error?.stack }),
  });
});

server.listen(BACKEND_PORT, () => {
  console.log(`Backend server is running on ${BACKEND_PORT}`);
});