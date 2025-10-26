import { getAll } from "@/services/api.genre";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const useGenreSearch = (initialLimit = 100) => {
  const [genre, setGenre] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: initialLimit,
    totalPage: 1,
    total: 0,
  });

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchGenre = useCallback(async (search = "", page = 1, limit = initialLimit) => {
    try {
      setLoading(true);
      const res = await getAll(page, limit, search);
      setGenre(res.result.data);
      setPagination(res.result.pagination);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setGenre([]);
    } finally {
      setLoading(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    fetchGenre(debouncedSearch);
  }, [debouncedSearch, fetchGenre]);

  return {
    genre,
    searchQuery,
    setSearchQuery,
    loading,
    pagination,
    fetchGenre,
  };
};

