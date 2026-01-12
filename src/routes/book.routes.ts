// src/routes/book.routes.ts
import { Router } from "express";
import * as controller from "../controllers/book.controller";
import { bulkImportBooks } from "../controllers/book.controller";
import { importBooks } from "../controllers/book.import.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.post("/create", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

router.post("/import", upload.single("file"), bulkImportBooks);
export default router;
