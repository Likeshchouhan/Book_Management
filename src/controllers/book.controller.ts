import { Request, Response } from "express";
import * as bookService from "../services/book.service";
import fs from "fs";

// GET /books
export const getBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.status(200).json(books);
};

// GET /books/:id
export const getBookById = (req: Request, res: Response) => {
  const id = req.params.id as string;

  const book = bookService.getBookById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
};

// POST /books
export const createBook = (req: Request, res: Response) => {
  const book = bookService.createBook(req.body);
  res.status(201).json(book);
};

// PUT /books/:id
export const updateBook = (req: Request, res: Response) => {
  const id = req.params.id as string;

  const updatedBook = bookService.updateBook(id, req.body);
  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(updatedBook);
};

// DELETE /books/:id
export const deleteBook = (req: Request, res: Response) => {
  const id = req.params.id as string;

  const deleted = bookService.deleteBook(id);
  if (!deleted) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book deleted successfully" });
};



export const bulkImportBooks = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const fileContent = fs.readFileSync(req.file.path, "utf-8");
  const lines = fileContent.split("\n").filter(Boolean);

  const headers = lines[0].split(",").map(h => h.trim());
  const errors: any[] = [];
  let successCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map(v => v.trim());
    const rowNumber = i + 1;

    const data: any = {};
    headers.forEach((h, idx) => (data[h] = row[idx]));

    // 🔍 Manual Validation
    const rowErrors: string[] = [];

    if (!data.title) rowErrors.push("Title is missing");
    if (!data.author) rowErrors.push("Author is missing");
    if (!data.publishedYear || isNaN(Number(data.publishedYear)))
      rowErrors.push("Invalid publishedYear");

    if (rowErrors.length > 0) {
      errors.push({
        row: rowNumber,
        errors: rowErrors
      });
      continue;
    }

     bookService.createBook({
      title: data.title,
      author: data.author,
      publishedYear: Number(data.publishedYear)
    });
    successCount++;
  }

  // delete uploaded file
  fs.unlinkSync(req.file.path);

  return res.json({
    booksAdded: successCount,
    errorRows: errors
  });
};
