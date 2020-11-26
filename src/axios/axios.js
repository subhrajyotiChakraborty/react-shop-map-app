import axios from "axios";

const instance = axios.create({
  baseURL: "https://map-shop-app.herokuapp.com/",
});

export default instance;
