import { instance } from "../instance";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


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

    const response = await instance.delete(`/carts/remove?${params.toString()}`, getAuthHeader());
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

const createOrder = async ({cartId , addressId , paymentMethod}) => {
    try {
        const response = await instance.post(
            `/api/payment?cartId=${cartId}&addressId=${addressId}&paymentMethod=${paymentMethod}`,
            {},
            getAuthHeader()
        )
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getOrderHistory = async () => {
    try{
        const response = await instance.get("/orders/history-order", getAuthHeader())
        return response
    } catch (err) {
        console.log("Error:", err);
    }
}

const getOrderDetail = async (id) => {
    try{
        const response = await instance.get(`/orders/${id}`, getAuthHeader())
        return response
    } catch (err) {
        console.log("Error:", err)
    }
}

export { bookOrder, getProductDetail, addToCart, getCart, updateCart, deleteCart, createOrder,
    getOrderHistory, getOrderDetail
 }
