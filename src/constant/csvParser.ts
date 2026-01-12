import { Book } from "../models/book.model";

interface ImportResult {
  validBooks: Omit<Book, "id">[];
  errors: { row: number; error: string }[];
}

export const parseCSV = (csvData: string): ImportResult => {
  const lines = csvData.trim().split("\n");

  const validBooks: Omit<Book, "id">[] = [];
  const errors: { row: number; error: string }[] = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");

    if (row.length !== 3) {
      errors.push({ row: i + 1, error: "Invalid column count" });
      continue;
    }

    const [title, author, publishedYear] = row.map(col => col.trim());

    if (!title || !author || !publishedYear) {
      errors.push({ row: i + 1, error: "Missing required fields" });
      continue;
    }

    const year = Number(publishedYear);
    if (isNaN(year)) {
      errors.push({ row: i + 1, error: "publishedYear must be a number" });
      continue;
    }

    validBooks.push({
      title,
      author,
      publishedYear: year
    });
  }

  return { validBooks, errors };
};
