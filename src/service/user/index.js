import { instance } from "../instance";
const token = localStorage.getItem("token");
const authHeader = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

const getAllProduct = async () => {
    try {
        const response = await instance.get("/api/products/search")
        return response
    } catch (error) {
        console.log("error", error);
    }
}

 const bookOrder = async(data) => {
    try{
        const response = await instance.post("/api/bookOrder", data, authHeader)   
        return response.data
    }catch(error){
        console.log("error", error);
    }
}

export { getAllProduct, bookOrder }