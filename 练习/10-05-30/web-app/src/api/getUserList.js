/**
 * 获取用户列表
 */
import http from './http'

function getUserList(data){
    return http.get('/sys/user/list', {
        // 查询字符串参数，用 parame来传递
        params: data
    });
}

export default getUserList;