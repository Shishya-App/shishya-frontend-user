import axios from "axios";

// todo -> Add more options as required
const AxiosInstance = axios.create({
  baseURL: "https://shishya-backend-user.herokuapp.com/",
});

export default AxiosInstance;
