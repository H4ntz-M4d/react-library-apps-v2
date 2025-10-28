import { BookProvider } from "../context/BooksContext";
import { BookContent } from "../content/BookContent";

export const BookApp = () => {
  return (
    <BookProvider>
        <BookContent />
    </BookProvider>
  );
};
