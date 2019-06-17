/**
 * 路由信息
 */
import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

/**
 * 组件部分
 */
import AdminPage from '../pages/Admin.vue'
import AdminUserPage from '../pages/admin/Users.vue'
import AdminRolePage from '../pages/admin/Role.vue'
import notFindPage from '../pages/notFind.vue'
import LoginPage from '../pages/Login.vue'
import AddUserPage from '../pages/admin/AddUser.vue'


const router = new vueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/sys',
            component: AdminPage,
            meta: {
                auth_login: true
            },
            children: [
                {
                    path: 'user',
                    component: AdminUserPage,
                    meta: {
                        auth_login: true
                    },
                },
                {
                    path: 'role',
                    component: AdminRolePage,
                    meta: {
                        auth_login: true
                    },
                },
                {
                    path: 'addUser',
                    component: AddUserPage,
                    meta: {
                        auth_login: true,
                    }
                }
            ]
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/404',
            component: notFindPage
        }
    ]
})


// 路由拦截器
router.beforeEach((to, from, next)=>{
    if(to.meta.auth_login){
        const token = localStorage.getItem('token')
        if(token){
            next();
        }else{
            next({
                path: '/login'
            })
        }
    }else{
        next();
    }
})

export default router;

