/**
 * 更新管理员
 */
import http from './http'

function updateUser(data){
    return http.post('/sys/user/update', data);
}

export default updateUser;