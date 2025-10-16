import { getAll } from "@/services/api.book";
import { useEffect, useState } from "react";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  const fetchBook = async (page = 1, limit = pagination.limit) => {
    try {
      const res = await getAll(page, limit);
      setBooks(res.result.data);
      setPagination(res.result.pagination);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return {books, pagination, setPagination, fetchBook, setBooks}
};
