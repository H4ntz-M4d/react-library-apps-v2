const baseApi = "http://localhost:2500/api";

export const getAll = async (page = 1, limit = 10) => {
    const res = await fetch(`${baseApi}/books?page=${page}&limit=${limit}`)
    return res.json()
}

export const getById = async (id_buku) => {
    const res = await fetch(`${baseApi}/books/${id_buku}`)
    return res.json()
}

export const create = async (data) => {
    const res = await fetch(`${baseApi}/books`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/books/${id_buku}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await res.json()

    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/books/${id_buku}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })

    const result = await res.json()

    if (!res.ok || !result.success) {
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
    const res = await fetch(`${baseApi}/books`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ id_bukuSelected: data })
    })

    const result = await res.json()

    if (!res.ok || !result.success) {
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