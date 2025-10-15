import { useGenres } from "../hooks/useGenres";
import { useContext, createContext } from "react";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const genre = useGenres();
  return (
    <GenreContext.Provider value={genre}>{children}</GenreContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenreContext);
