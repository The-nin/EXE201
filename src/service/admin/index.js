import { instance } from "../instance";
import axios from "axios";
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
        return response.data.result;
    } catch (error) {
        console.log("error", error);
    }
}

const addTypePrint = async (data) => {
    try {
        const response = await instance.post("/api/typePrint", data, authHeader);
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
}

//Product Mng
const getAllProduct = async () => {
    try {
        const response = await instance.get("/api/products", authHeader);
        return response.data.result;
    } catch (error) {
        console.log("Error: ", error);
    }
}

const createProduct = async (data) => {
    try {
        const response = await instance.post("/api/products", data, authHeader);
        return response
    } catch (error) {
        console.log("Error:", error)
    }
}

export const getAllBookOrders = async () => {
    try{
        const response = await instance.get("/api/bookOrder", authHeader);
        return response.data.result;
    }catch(error){
        console.log("error", error);
    }
}

export const getAllDesigner = async () => {
    try{
        const response = await instance.get("/api/users/designers", authHeader);
        return response.data.result;
    }catch(error){
        console.log("error", error);
    }
}

export const assignDesigner = async (bookOrderId, data) => {
  try {
    const response = await instance.put(
      `/api/bookOrder/${bookOrderId}`,
      data, authHeader
    );
    return response.data ;
  } catch (error) {
    console.error("Lỗi khi gán designer:", error);
    throw error;
  }
};

export const deliverySuccess = async (id, payload) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.patch(
      `/api/bookOrder/delivery/${id}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const designUploadSuccess = async (id, payload) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.patch(
      `/api/bookOrder/designer/${id}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};


export const getAddressByUser = async () => {
    try{
        const response = await instance.get("/api/addresses", authHeader);
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

export const cancelBookOrder = async (id, response) => {
  try {
    console.log("Sending DELETE request:", { id, response, headers: authHeader.headers });
    const res = await instance.delete(`/api/bookOrder/${id}`, {
      headers: authHeader.headers, // Gửi header xác thực
      data: { response }, 
    });
    return res.data; // Trả về res.data để khớp với code gốc
  } catch (error) {
    console.error("Error cancelling order:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getAddressId = async (id) => {
    try{
        const response = await instance.get(`/api/addresses/${id}`, authHeader);
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

export const paymentSuccess = async (id) => {
    try{
        const response = await instance.patch(`/api/bookOrder/${id}/`, null, authHeader);
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

export const changeStatus = async (id, formData) => {
  try {
    const response = await instance.put(
      `/api/bookOrder/${id}`,
      formData,
      authHeader
    );
    return response.data;
  } catch (error) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
};


export { 
    getAllAccount, 
    getAllCategory, createCategory, 
    getAllFabric, createFabric, 
    getAllTypePrint, addTypePrint,
    getAllProduct, createProduct,
}
