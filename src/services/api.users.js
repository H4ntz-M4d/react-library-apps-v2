import { apiFetch } from "./api.client"

export const getUsers = async (role, page = 1, limit = 10) => {
    const res = await apiFetch(`/api/users/${role}?page=${page}&limit=${limit}`)
    return res
}