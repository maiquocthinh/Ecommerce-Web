import axios from "axios";
const instance = axios.create({
    baseURL: "http://shop-ttlhg.somee.com",
    // baseURL: "https://6bc6-2402-800-bbbb-7d-b983-d718-3c5b-a3c0.ngrok-free.app",
    // withCredentials: true,
    // headers: { "ngrok-skip-browser-warning": "69420" },
});

instance.interceptors.response.use((response) => {
    return response.data;
});

export default instance;
