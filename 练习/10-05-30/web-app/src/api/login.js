/**
 * 登陆接口
 */
import http from './http'

function login(data){
    return http.post('/sys/login', data);
}

export default login;