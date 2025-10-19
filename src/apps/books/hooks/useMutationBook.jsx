import { useState } from "react";
import { useBooksContext } from "../context/BooksContext";
import { create, getById, remove, removeSelected, update } from "@/services/api.book";
import { useImmer } from "use-immer";

export const useMutationBook = () => {
  const { fetchBook } = useBooksContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [isEdit, setEdit] = useState(null);
  const [formData, setFormData] = useImmer({
    kd_buku: "",
    nama_buku: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    id_genre: [""],
  });

  const add = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await create(data);
      if (res?.success == true) {
        fetchBook && fetchBook();
      }
      return res;
      
    } catch (err) {
      setError(err.message);
      setValidationError(err.validationError);
      throw err
    } finally {
      setLoading(false)
    }
  };

  const loadBookById = async (id) => {
    setLoading(true);
    try {
      // Fetch data dari API berdasarkan ID
      const response = await getById(id);

      if (!response || !response.success) {
        throw new Error('Failed to fetch book data');
      }
      
      const data = response.result;
      // Set form data
      setFormData(draft => {
        draft.kd_buku = data.kd_buku || "";
        draft.nama_buku = data.nama_buku || "";
        draft.pengarang = data.pengarang || "";
        draft.penerbit = data.penerbit || "";
        draft.tahun_terbit = data.tahun_terbit || "";
        draft.id_genre = data.buku_genre?.map(item => String(item.id_genre)) || [""];
      });
      
      
      setEdit(id);
      return response;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const edit = async (id_buku, data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await update(id_buku, data);
      if (res?.success) {
        fetchBook && fetchBook();
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationError(err.validationError);
      throw err

    } finally {
      setLoading(false)
    }
  };

  const removed = async (id_buku) => {
    setLoading(true);
    setError(null);

    try {
      const res = await remove(id_buku);
      if (res?.success) {
        fetchBook && fetchBook();
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationError(err.validationError);
      throw err

    } finally {
      setLoading(false)
    }
  };

  const removedSelected = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await removeSelected(data);
      if (res?.success) {
        fetchBook && fetchBook();
      }
      return res;
    } catch (err) {
      setError(err.message);
      setValidationError(err.validationError);
      throw err

    } finally {
      setLoading(false)
    }
  };

  return {
    add,
    edit,
    removed,
    loading,
    error,
    validationError,
    formData, setFormData,
    isEdit, setEdit,
    loadBookById,
    removedSelected
  };
};
