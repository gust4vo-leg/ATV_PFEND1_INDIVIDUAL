import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import noticiasRoutes from "./routes/noticiasRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/noticias", noticiasRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API do site de notícias rodando com sucesso com ES Modules!");
});

export default app;
