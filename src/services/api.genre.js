const baseApi = "http://localhost:2500";

export const getAll = async (page = 1, limit = 10) => {
  const res = await fetch(`${baseApi}/api/genres?page=${page}&limit=${limit}`);
  return res.json();
};

export const getById = async (id_genre) => {
    const res = await fetch(`${baseApi}/api/genres/${id_genre}`)
    return res.json()
}

export const create = async (data) => {
    const res = await fetch(`${baseApi}/api/genres`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json();
    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/api/genres/${id_genre}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json();
    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/api/genres/${id_genre}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })


    const result = await res.json();
    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/api/genres`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({id_genre_Selected: id_genre_Selected})
    })


    const result = await res.json();
    if (!res.ok || !result.success) {
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
