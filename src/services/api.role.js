import { apiFetch } from "./api.client"

export const roleAll = async (page = 1, limit = 10) => {
    const res = await apiFetch(`/api/roles?page=${page}&limit=${limit}`)
    return res
}

export const createRole = async (data) => {
    const res = await apiFetch(`/api/roles`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    return res
}

export const updateRole = async (id_role, data) => {
    const res = await apiFetch(`/api/roles/${id_role}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

    return res
}

export const deleteRole = async (id_role) => {
    const res = await apiFetch(`/api/roles/${id_role}`, {
        method: "DELETE",
    })
    return res
}

export const deleteRoleSelected = async (data_id_selected) => {
    const res = await apiFetch(`/api/roles/${id_role}`, {
        method: "DELETE",
        body: JSON.stringify({ data_id_selected })
    })
    return res
}