import { apiFetch } from "./api.client";

export const getAll = async (page = 1, limit = 10) => {
  const response = await apiFetch(`/api/genres?page=${page}&limit=${limit}`,{
    method: "GET",
  });
  return response;
};

export const getAllGenre = async (page = 1, limit = 10) => {
  const response = await apiFetch(`/api/genres/all`,{
    method: "GET",
  });
  return response;
};

export const getById = async (id_genre) => {
    const res = await apiFetch(`/api/genres/${id_genre}`)
    return res
}

export const create = async (data) => {
    const res = await apiFetch(`/api/genres`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const result = res;
    if (!result?.success) {
        let errorMessage = "Request Failed";
        
        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                // Convert object validation errors ke string
                const errors = Object.values(result.message).join(', ');
                errorMessage = errors;
            }
        }
        
        const customError = new Error(errorMessage);
        customError.validationErrors = result.message; // ← Simpan object asli
        throw customError;
    }
    return result;
}

export const update = async (id_genre, data) => {
    const res = await apiFetch(`/api/genres/${id_genre}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })
    const result = res;
    if (!result?.success) {
        let errorMessage = "Request Failed";
        
        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                // Convert object validation errors ke string
                const errors = Object.values(result.message).join(', ');
                errorMessage = errors;
            }
        }
        
        const customError = new Error(errorMessage);
        customError.validationErrors = result.message; // ← Simpan object asli
        throw customError;
    }
    return result;
}

export const remove = async (id_genre) => {
    const res = await apiFetch(`/api/genres/${id_genre}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    const result = res;
    if (!result?.success) {
        let errorMessage = "Request Failed";
        
        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                // Convert object validation errors ke string
                const errors = Object.values(result.message).join(', ');
                errorMessage = errors;
            }
        }
        
        const customError = new Error(errorMessage);
        customError.validationErrors = result.message; // ← Simpan object asli
        throw customError;
    }
    return result;
}

export const removeSelected = async (id_genre_Selected) => {
    const res = await apiFetch(`/api/genres`, {
        method: "DELETE",
        body: JSON.stringify({id_genre_Selected: id_genre_Selected})
    })
    const result = res;
    if (!result?.success) {
        let errorMessage = "Request Failed";
        
        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                // Convert object validation errors ke string
                const errors = Object.values(result.message).join(', ');
                errorMessage = errors;
            }
        }
        
        const customError = new Error(errorMessage);
        customError.validationErrors = result.message; // ← Simpan object asli
        throw customError;
    }
    return result;
}
