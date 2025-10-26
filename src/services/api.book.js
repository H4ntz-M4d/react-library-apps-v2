import { apiFetch } from "./api.client";

export const getAll = async (page = 1, limit = 10) => {
    const res = await apiFetch(`/api/books?page=${page}&limit=${limit}`)
    return res
}

export const getById = async (id_buku) => {
    const res = await apiFetch(`/api/books/${id_buku}`)
    return res
}

export const create = async (data) => {
    const result = await apiFetch(`/api/books`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!result.success) {
        let errorMessage = "Request Failed"

        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                const error = Object.values(result.message).join(', ');
                errorMessage = error;
            }
        }

        const customError = new Error(errorMessage)
        customError.validationError = result.message;
        throw customError;
    }

    return result
}

export const update = async (id_buku, data) => {
    const result = await apiFetch(`/api/books/${id_buku}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    if (!result.success) {
        let errorMessage = "Response Failed"

        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                const error = Object.values(result.message).join(', ');
                errorMessage = error;
            }
        }

        const customError = new Error(errorMessage)
        customError.validationError = result.message
        throw customError
    }

    return result
}

export const remove = async (id_buku) => {
    const result = await apiFetch(`/api/books/${id_buku}`, {
        method: "DELETE",
    })

    if (!result.success) {
        let errorMessage = "Response Failed"

        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                const error = Object.values(result.message).join(', ');
                errorMessage = error;
            }
        }

        const customError = new Error(errorMessage)
        customError.validationError = result.message
        throw customError
    }

    return result
}

export const removeSelected = async (data) => {
    const result = await apiFetch(`/api/books`, {
        method: "DELETE",
        body: JSON.stringify({ id_bukuSelected: data })
    })

    if (!result.success) {
        let errorMessage = "Response Failed"

        if (result.message) {
            if (typeof result.message === 'string') {
                errorMessage = result.message;
            } else if (typeof result.message === 'object') {
                const error = Object.values(result.message).join(', ');
                errorMessage = error;
            }
        }

        const customError = new Error(errorMessage)
        customError.validationError = result.message
        throw customError
    }

    return result
}