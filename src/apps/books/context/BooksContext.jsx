import { createContext, useContext } from "react";
import { useBooks } from "../hooks/useBooks";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const books = useBooks();

  return (
    <BookContext.Provider value={books}>{children}</BookContext.Provider>
  );
};

export const useBooksContext = () => useContext(BookContext);
