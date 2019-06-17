/**
 * 递归菜单
 * @param {Array} menu 
 * @param {Number} parentId 
 */
function deepMenu(menu, parentId){
    if(Array.isArray(menu)) {
        return menu.filter((item, index, arr)=>{
            if(item.parentId === parentId){
                item.children = deepMenu(menu, item.menuId)
                return true;
            }
        })
    }
}


export default deepMenu;