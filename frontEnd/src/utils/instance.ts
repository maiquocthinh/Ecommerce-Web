// eslint-disable-next-line prettier/prettier
import axios from "axios"
const instance = axios.create({
  baseURL: "http://localhost:3000",
  // withCredentials: true,
})

instance.interceptors.response.use((response) => {
  const { data } = response
  return response
})

export default instance
