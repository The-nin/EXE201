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

const addToCart = async (productId, quantity, size) => {
    try {
        const response = await instance.post(`/carts?productId=${productId}&quantity=${quantity}&size=${size}`,
            null,
            authHeader
        )
        return response
    } catch (error) {
        console.log("error", error);
    }
}
export const paymentSuccess = async (id) => {
    try{
        const response = await instance.patch(`/api/bookOrder/${id}`, null, authHeader);
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

export const paymentBookOrder = async (orderCode , amount) => {
    try{
        const response = await instance.post(`/api/payment/payOs`, {orderCode , amount}, authHeader);
        return response.data;
    }catch(error){
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

const getCart = async () => {
    try {
        const response = await instance.get("/carts", authHeader)
        return response.data.result
    } catch (error) {
        console.log("error", error);
    }
}

const updateCart = async(productId, quantity) => {
    try {
        const response = await instance.patch(
                `/carts/update-quantity?productId=${productId}&quantity=${quantity}`,
                {},
                authHeader
            )
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

// const deleteCart = async(productIds) => {
//     try {
//         const response = await instance.delete(`/carts/remove?productIds=${productIds}`, {},authHeader)
//         console.log(response)
//         return response
//     } catch (error) {
//         console.log("error", error);
//     }
// }

const deleteCart = async (productIds) => {
  try {
    const params = new URLSearchParams();
    productIds.forEach((id) => params.append("productIds", id));

    const response = await instance.delete(`/carts/remove?${params.toString()}`, authHeader);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

const createOrder = async (cartId , addressId , paymentMethod ) => {
    try {
        const response = await instance.post(
            `/api/payment?cartId=${cartId}&addressId=${addressId}&paymentMethod=${paymentMethod}`,
            {},
            authHeader
        )
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getOrderHistory = async () => {
    const token = localStorage.getItem("token");
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await instance.get("/order/history-order", authHeader);
        return response
    } catch (error) {
        console.log(error)
    }
}

const getOrderDetail = async (id) => {
    const token = localStorage.getItem("token");
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await instance.get(`/orders/${id}`, authHeader);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getBookOrderHistory = async () => {
    try {
        const response = await instance.get("/api/bookOrder/mybookorder", authHeader)
        return response.data.result
    } catch (error) {
        console.log("error", error);
    }
}

export { bookOrder, getProductDetail, addToCart, getCart, updateCart, deleteCart, createOrder,
    getOrderDetail, getOrderHistory }
