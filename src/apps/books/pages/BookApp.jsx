import { BookProvider } from "../context/BooksContext";
import { BookContent } from "./BookContent";

export const BookApp = () => {
  return (
    <BookProvider>
        <BookContent />
    </BookProvider>
  );
};
