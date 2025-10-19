import { useState } from "react";
import { useGenresContext } from "../context/GenreContext";
import { create, remove, removeSelected, update } from "@/services/api.genre";

export const useMutationGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const { fetchGenre, pagination } = useGenresContext();

  const add = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await create(data);
      if (res?.success == true) {
        fetchGenre && fetchGenre(pagination.page, pagination.limit);
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationErrors(err.validationErrors);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const edit = async (id_genre, data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await update(id_genre, data);
      if (res?.success == true) {
        fetchGenre && fetchGenre(pagination.page, pagination.limit);
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationErrors(err.validationErrors);
    } finally {
      setLoading(false);
    }
  };

  const removed = async (id_genre) => {
    setLoading(true);
    setError(null);

    try {
      const res = await remove(id_genre);
      if (res?.success == true) {
        fetchGenre && fetchGenre(pagination.page, pagination.limit);
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationErrors(err.validationErrors);
    } finally {
      setLoading(false);
    }
  };
  
  const removedSelected = async (id_genre_Selected) => {
    setLoading(true);
    setError(null);

    try {
      const res = await removeSelected(id_genre_Selected);
      if (res?.success == true) {
        fetchGenre && fetchGenre();
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationErrors(err.validationErrors);
    } finally {
      setLoading(false);
    }
  };

  return { add, edit, removed, loading, error, validationErrors, setValidationErrors, removedSelected };
};
