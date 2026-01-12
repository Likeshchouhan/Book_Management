import { Request, Response } from "express";
import { parseCSV } from "../constant/csvParser";
import { createBook } from "../services/book.service";

export const importBooks = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const csvContent = req.file.buffer.toString("utf-8");
  
  const { validBooks, errors } = parseCSV(csvContent);

  validBooks.forEach(book => createBook(book));

  res.status(200).json({
    booksAdded: validBooks.length,
    errors
  });

};
