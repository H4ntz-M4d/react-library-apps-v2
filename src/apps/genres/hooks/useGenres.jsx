import { getAll, getAllGenre } from "@/services/api.genre";
import { useEffect, useState } from "react";

export const useGenres = () => {
  const [genre, setGenre] = useState([]);
  const [genreAll, setGenreAll] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
    total: 0,
  });

  const fetchGenre = async (page = 1, limit = pagination.limit) => {
    try {
      const res = await getAll(page, limit);
      if (res?.success) {
        setGenre(res.result.data);
        setPagination(res.result.pagination);
      }
      return res
    } catch (error) {
      throw error;
    }
  };

  const fetchGenreAll = async () => {
    try {
      const res = await getAllGenre();
      if (res.success) {
        setGenreAll(res.result);
      }
      return res
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return {
    genre,
    setGenre,
    pagination,
    setPagination,
    fetchGenre,
    genreAll,
    fetchGenreAll,
  };
};
