import { instance } from "../instance";

const token = localStorage.getItem("token");
const authHeader = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

const getAllAccount = async () => {
    try {
        const response = await instance.get("/api/users/all", authHeader);
        return response.result;
    } catch (error) {
        console.log("error", error);
    }
}

const getAllCategory = async () =>{
    try{
        const response = await instance.get("/api/category", authHeader);
        console.log(response)
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

const createCategory = async (data) => {
    try {
        const response = await instance.post("/api/category", data, authHeader);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
}

const getAllFabric = async () => {
    try {
        const response = await instance.get("/api/fabric/all", authHeader);
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

const createFabric = async (data) => {
    try {
        const response = await instance.post("/api/fabric", data, authHeader);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
}

const getAllTypePrint = async () => {
    try {
        const response = await instance.get("/api/typePrint/all", authHeader);
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

export const getAllBookOrders = async () => {
    try {
        const response = await instance.get("/api/bookOrder", authHeader);
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

export const getAllDesigner = async () => {
    try{    
        const reponse = await instance.get("/api/users/designers", authHeader);
        console.log(reponse)
        return reponse.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

    export const assignDesigner = async (data, bookOrderId) => {
        try {
        const response = await instance.put(`/api/bookOrder/${bookOrderId}`, data, authHeader);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

export { getAllAccount, getAllCategory, createCategory, getAllFabric, createFabric , getAllTypePrint}