import { instance } from "../instance";

const getAllProduct = async () => {
    try {
        const response = await instance.get("/api/products/search")
        return response
    } catch (error) {
        console.log("error", error);
    }
}

export { getAllProduct }