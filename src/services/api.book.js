const baseApi = "http://localhost:2500/api";

export const getAll = async (page = 1, limit = 10) => {
    const res = await fetch(`${baseApi}/books?page=${page}&limit=${limit}`)
    return res.json()
}

export const getById = async (id_genre) => {
    const res = await fetch(`${baseApi}/books/${id_genre}`)
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
        const errorMessage = "Request Failed"
        
        if (typeof result.message === 'string') {
            errorMessage = result.message
        } else if (typeof result.message === 'object') {
            const error = Object.values(result.message).join(', ');
            errorMessage = error
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
        const errorMessage = "Response Failed"
        
        if (typeof result.message === 'string') {
            errorMessage = result.message
        } else if (typeof result.message === 'object') {
            errorMessage = Object.values(result.message).join(', ')
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
        const errorMessage = "Response Failed"
        
        if (typeof result.message === 'string') {
            errorMessage = result.message
        } else if (typeof result.message === 'object') {
            errorMessage = Object.values(result.message).join(', ')
        }

        const customError = new Error(errorMessage)
        customError.validationError = result.message
        throw customError
    }
    
    return result
}