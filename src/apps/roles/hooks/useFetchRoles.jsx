import { roleAll } from "@/services/api.role";
import { useEffect, useState } from "react";

export const useFetchRoles = () => {
  const [role, setRole] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchRole = async (page = 1, limit = pagination.limit) => {
    try {
      const res = await roleAll(page, limit);
      if (res.success) {
        setRole(res.result.data);
        setPagination(res.result.pagination);
      }

      return res;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchRole()
  }, [])

  return { role, pagination, setPagination, fetchRole };
};
