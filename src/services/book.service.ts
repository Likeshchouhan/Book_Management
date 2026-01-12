import { Book } from "../models/book.model";
import { v4 as uuidv4 } from "uuid";

const books: Book[] = [];

// Get all books
export const getAllBooks = (): Book[] => {
  return books;
};

// Get book by ID
export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

// Create new book
export const createBook = (data: Omit<Book, "id">): Book => {
  const book: Book = {
    id: uuidv4(),
    title: data.title,
    author: data.author,
    publishedYear: data.publishedYear
  };

  books.push(book);
  return book;
};

// Update book
export const updateBook = (
  id: string,
  data: Partial<Omit<Book, "id">>
): Book | null => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;

  books[index] = { ...books[index], ...data };
  return books[index];
};

// Delete book
export const deleteBook = (id: string): boolean => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
};
