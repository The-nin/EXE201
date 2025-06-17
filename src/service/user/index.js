import { instance } from "../instance";
const token = localStorage.getItem("token");
const authHeader = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}


const getProductDetail = async (id) => {
    try {
        const response = await instance.get(`/api/products/${id}`, authHeader)
        return response.data.result
    } catch (error) {
        console.log("error", error);
    }
}

const addToCart = async (productId, quantity) => {
    try {
        const response = await instance.post(`/carts`, authHeader,
            {
                productId,
                quantity
            }
        )
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

export { bookOrder, getProductDetail, addToCart }
