import { GenreProvider } from "../context/GenreContext";
import GenreContent from "./GenreContent";

export default function GenreList() {
  return (
    <GenreProvider>
      <GenreContent />
    </GenreProvider>
  );
}
