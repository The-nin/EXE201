import { getAuthHeader, instance } from "../instance";

const getProductDetail = async (id) => {
    try {
        const response = await instance.get(`/api/products/${id}`, getAuthHeader())
        return response.data.result
    } catch (error) {
        console.log("error", error);
    }
}

const addToCart = async (productId, quantity, size) => {
    try {
        const response = await instance.post(`/carts?productId=${productId}&quantity=${quantity}&size=${size}`,
            null,
            getAuthHeader()
        )
        return response
    } catch (error) {
        console.log("error", error);
    }
}
export const paymentSuccess = async (id) => {
    try{
        const response = await instance.patch(`/api/bookOrder/${id}`, null, getAuthHeader());
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

export const paymentBookOrder = async (orderCode , amount) => {
    try{
        const response = await instance.post(`/api/payment/payOs`, {orderCode , amount}, getAuthHeader());
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}
const bookOrder = async(data) => {
    try{
        const response = await instance.post("/api/bookOrder", data, getAuthHeader())   
        return response.data
    }catch(error){
        console.log("error", error);
    }
}

const getCart = async () => {
    try {
        const response = await instance.get("/carts", getAuthHeader())
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
                getAuthHeader()
            )
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

// const deleteCart = async(productIds) => {
//     try {
//         const response = await instance.delete(`/carts/remove?productIds=${productIds}`, {},getAuthHeader())
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

    const response = await instance.delete(`/carts/remove?${params.toString()}`, getAuthHeader());
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
            getAuthHeader()
        )
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getOrderHistory = async () => {
    try {
        const response = await instance.get("/orders/history-order", getAuthHeader());
        return response
    } catch (error) {
        console.log(error)
    }
}

const getOrderDetail = async (id) => {
    try {
        const response = await instance.get(`/orders/${id}`, getAuthHeader());
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
