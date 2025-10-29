import { getUsers } from "@/services/api.users"
import { useEffect, useState } from "react"

export const useFetchUsers = (roleFromPage) => {
    const [users, setUsers] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    })

    const fetchUsers = async (roleUsers = roleFromPage, page = 1, limit = pagination.limit) => {
        try {
            const res = await getUsers(roleUsers, page, limit)
            if (res?.success) {
                setUsers(res.result.data)
                setPagination(res.result.pagination)
            }
            return res
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (roleFromPage) fetchUsers(roleFromPage, 1, pagination.limit)
    }, [roleFromPage, pagination.limit])

    return { users, pagination, setPagination, fetchUsers }
}