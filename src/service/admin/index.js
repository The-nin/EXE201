import { instance } from "../instance";

const token = localStorage.getItem("token");
const authHeader = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

//Account Mng
const getAllAccount = async () => {
    try {
        const response = await instance.get("/api/users/all", authHeader);
        return response.result;
    } catch (error) {
        console.log("error", error);
    }
}

//Category Mng
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

//Fabric Mng
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

//Type Print Mng
const getAllTypePrint = async () => {
    try {
        const response = await instance.get("/api/typePrint/all", authHeader);
        console.log(response)
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

const addTypePrint = async (data) => {
    try {
        const response = await instance.post("/api/typePrint", data, authHeader);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
}

//Product Mng
const createProduct = async (data) => {
    try {
        const response = await instance.post("/api/products", data, authHeader);
        return response
    } catch (error) {
        console.log("Error:", error)
    }
}

export { 
    getAllAccount, 
    getAllCategory, createCategory, 
    getAllFabric, createFabric, 
    getAllTypePrint, addTypePrint,
    createProduct,
}

