import axios from "axios";

export const instance = axios.create({
    //local
    // baseURL: "http://localhost:8080",
    //PRM
    // baseURL: "https://icot.onrender.com",
    //Production
    baseURL: "https://icot.vercel.app",
    withCredentials : true,
    timeout : 5000,
    headers: {
        "Content-Type" : "application/json",
    },
})

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

//Tích hợp authen vào instance
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//Tích hợp authen vào instance với end points nhất định trên server
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   // Chỉ thêm token nếu URL bắt đầu bằng /api/secure
//   if (token && config.url.startsWith("/api/secure")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });