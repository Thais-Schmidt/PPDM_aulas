import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.0.186:3000'
    //baseURL: 'http://192.168.137.1:3000'
});

export default api;

//função que vai conectar todo o app com a api
