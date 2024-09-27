import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://task-vistaar.vercel.app/",
});

export default instance;
