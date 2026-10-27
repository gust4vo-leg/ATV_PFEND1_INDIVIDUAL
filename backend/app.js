import express from "express";
import cors from "cors";
import path from "node:path";
import noticiasRoutes from "./routes/noticiasRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.resolve("uploads")),
);

app.use("/api/noticias", noticiasRoutes);

app.get("/", (req, res) => {
  res.send("API do site de notícias rodando com sucesso com ES Modules!");
});

export default app;