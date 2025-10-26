const baseApi = "http://localhost:2500/auth"

export const register = async (data) => {
    const res = await fetch(`${baseApi}/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok || !response.success) {
        let errorMessage = "Request failed"

        if (response.message) {
            if (typeof response.message === 'string') {
                errorMessage = response.message
            } else if (typeof response.message === 'object') {
                const errors = Object.values(response.message).join(', ')
                errorMessage = errors
            }
        }

        const customError = new Error(errorMessage)
        customError.validationErrors = response.message
        throw customError
    }

    return response
}

export const login = async (data) => {
    const res = await fetch(`${baseApi}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok || !response.success) {
        let errorMessage = "Request failed"

        if (response.message) {
            if (typeof response.message === 'string') {
                errorMessage = response.message
            } else if (typeof response.message === 'object') {
                const errors = Object.values(response.message).join(', ')
                errorMessage = errors
            }
        }

        const customError = new Error(errorMessage)
        customError.validationErrors = response.message
        throw customError
    }

    return response
}

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};