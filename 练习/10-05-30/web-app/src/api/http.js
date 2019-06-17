import axios from 'axios'

const http = axios.create({
    baseURL: '/api'
})

http.interceptors.request.use((request)=> {
    request.headers.token = localStorage.getItem('token');
    return request;
})

// 响应拦截器
http.interceptors.response.use((response)=>{
    if(response.data.code === 401){
        localStorage.removeItem('token');
    }
    return response;
})

export default http;