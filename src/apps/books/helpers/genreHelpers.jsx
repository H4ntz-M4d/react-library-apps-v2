export const genreHelpers = (setFormData) => {
  const addGenre = () => {
    setFormData((draft) => {
      draft.id_genre.push("");
    });
  };

  const updateGenreAt = (index, value) => {
    setFormData((draft) => {
      draft.id_genre[index] = value; // simpan sebagai string id_genre
    });
  };

  const removeGenreAt = (index) => {
    setFormData((draft) => {
      draft.id_genre.splice(index, 1);
    });
  };

  return {
    addGenre,
    updateGenreAt,
    removeGenreAt,
  };
};
