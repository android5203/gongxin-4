/**
 * 菜单列表接口
 */
import http from './http'

function getMenuList(){
    return http.get('/sys/menu/list');
}

export default getMenuList;

