// eslint-disable-next-line prettier/prettier
import axios from "axios"
const instance = axios.create({
  baseURL: "http://shop-ttlhg.somee.com",
  // withCredentials: true,
})

instance.interceptors.response.use((response) => {
  const { data } = response.data
  return response.data
})

export default instance
