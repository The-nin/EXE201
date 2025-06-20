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
            `/api/payment?cartId =${cartId }&addressId=${addressId}&paymentMethod=${paymentMethod}`,
            {},
            authHeader
        )
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error:", error);
    }
}


export { bookOrder, getProductDetail, addToCart, getCart, updateCart, deleteCart, createOrder }
