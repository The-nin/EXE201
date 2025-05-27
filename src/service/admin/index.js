import { instance } from "../instance";

const getAllAccount = async () => {
    try {
        const response = await instance.get("/api/admin/get-all-account")
        return response
    } catch (error) {
        console.log("error", error);
    }
}

export { getAllAccount }