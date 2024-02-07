import axios from "axios"

export const httpAxios = axios.create({
    baseURL:"//localhost:8000"
})