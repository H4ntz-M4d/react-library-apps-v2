import { BookProvider } from "../context/BooksContext";
import { BookContent } from "../views/BookContent";

export const BookApp = () => {
  return (
    <BookProvider>
        <BookContent />
    </BookProvider>
  );
};
