/**
 * 添加管理员
 */

import http from './http'

function addUser(data) {
    return http.post('/sys/user/save', data);
}

export default addUser;