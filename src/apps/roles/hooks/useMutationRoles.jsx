import { useState } from "react";
import { useRoleContext } from "../context/RoleContext";
import { createRole, deleteRole, updateRole } from "@/services/api.role";

export const useMutationRoles = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const { fetchRole } = useRoleContext();

  const create = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await createRole(data);
      if (res.success) {
        fetchRole && fetchRole();
      }

      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id_role, data) => {
    setLoading(false);
    setError(null);

    try {
      const res = await updateRole(id_role, data);
      if (res.success) {
        fetchRole && fetchRole();
      }

      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id_role) => {
    setLoading(false);
    setError(null);

    try {
      const res = await deleteRole(id_role);
      if (res.success) {
        fetchRole && fetchRole();
      }

      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, isLoading, isError };
};
