import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials : true,
    timeout : 5000,
    headers: {
        "Content-Type" : "application/json",
    },
})