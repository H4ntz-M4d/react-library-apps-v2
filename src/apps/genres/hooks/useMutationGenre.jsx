import { useState } from "react";
import { useGenresContext } from "../context/GenreContext";
import { create, remove, update } from "@/services/api.genre";

export const useMutationGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const { fetchGenre } = useGenresContext();

  const add = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await create(data);
      if (res?.success == true) {
        fetchGenre && fetchGenre();
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

  const removed = async (id_genre) => {
    setLoading(true);
    setError(null);

    try {
      const res = await remove(id_genre);
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

  return { add, edit, removed, loading, error, validationErrors, setValidationErrors };
};
