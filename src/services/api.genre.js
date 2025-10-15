const baseApi = "http://localhost:2500";

export const getAll = async (page = 1, limit = 5) => {
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

    return res.json()
}

export const update = async (id_genre, data) => {
    const res = await fetch(`${baseApi}/api/genres/${id_genre}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const remove = async (id_genre) => {
    const res = await fetch(`${baseApi}/api/genres/${id_genre}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })

    return res.json()
}
