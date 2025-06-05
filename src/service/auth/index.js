import { instance } from "../instance";

const login = async (username, password) => {
    try {
        const response = await instance.post("/api/auth/login",{
            username,
            password
        }, { withCredentials: true })
        console.log(response)
        return response;
    } catch (error) {
        console.log("error", error);
    }
}

const register = async (data) => {
    try {
        const response = await instance.post("/api/auth/register", data)
        return response;
    } catch (error) {
        console.log("Register error", error);
        return {
            error: true,
            message: error.response?.message || "Registration failed",
          };
    }
}

const logout = async (token) => {
    try {
        const response = await instance.post("/api/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (error) {
        console.log("Logout error", error);
        return {
          error: true,
          message: error.response?.message || "Logout failed",
        };
      }
}

export { login , register, logout }