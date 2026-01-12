// src/app.ts
import express from "express";
import morgan from "morgan";
import bookRoutes from "./routes/book.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/books", bookRoutes);


export default app;