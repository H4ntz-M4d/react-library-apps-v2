import { getAll } from "@/services/api.genre";
import { useEffect, useState } from "react";

export const useGenres = () => {
  const [genre, setGenre] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPage: 1,
    total: 0,
  });

  const fetchGenre = async (page = 1, limit = pagination.limit) => {
    try {
      const res = await getAll(page, limit);
      setGenre(res.result.data);
      setPagination(res.result.pagination);
    } catch (error) {
      console.log("Error", error);
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
  };
};
