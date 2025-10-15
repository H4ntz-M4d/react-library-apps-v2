import { useState } from "react";
import { useGenresContext } from "../context/GenreContext";
import { create, remove, update } from "@/services/api.genre";
import { data } from "react-router";

export const useMutationGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    } catch (error) {
      setError("Terjadi error:", error);
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
    } catch (error) {
      setError("Terjadi kesalahan:", error);
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
    } catch (error) {
      setError("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  return { add, edit, removed, loading, error };
};
