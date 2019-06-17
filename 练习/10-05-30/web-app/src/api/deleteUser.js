/**
 * 删除用户
 */
import http from './http'

/**
 * 删除用户
 * @param {Array} data 
 */
function deleteUser(data){
    return http.post('/sys/user/delete', data)
}

export default deleteUser;