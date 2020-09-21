import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/Index'
import Home from './pages/index/Home'
import {checktoken} from '@/api/apis'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router=new VueRouter({
    routes: [{
            path: '/index/home',
            name: 'Index',
            component: Index,
            children: [{
                path: '/index/home',
                name: 'index/home',
                component: Home,
                meta:{breadlist:['首页']}
            },
            {
                path: '/index/updatePwd',
                name: 'index/updatePwd',
                component: () => import('./pages/index/UpdatePwd'),
                meta:{breadlist:['账号管理','修改密码']}
            },
            {
                path: '/index/userinfo',
                name: 'index/userinfo',
                component: () => import('./pages/index/Userinfo'),
                meta:{breadlist:['个人中心']}
            },
            {
                path: '/index/storeManage',
                name: 'index/storeManage',
                component: () => import('./pages/index/StoreManage'),
                meta:{breadlist:['店铺管理']}
            },
            {
                path: '/index/orderStatist',
                name: 'index/orderStatist',
                component: () => import('./pages/index/OrderStatist'),
                meta:{breadlist:['销售统计','订单统计']}
            },
            {
                path: '/index/storeStatist',
                name: 'index/storeStatist',
                component: () => import('./pages/index/StoreStatist'),
                meta:{breadlist:['销售统计','商品统计']}
            },
            {
                path: '/index/addUser',
                name: 'index/addUser',
                component: () => import('./pages/index/AddUser'),
                meta:{breadlist:['账号管理','添加账号']}
            },
            {
                path: '/index/orderManage',
                name: 'index/orderManage',
                component: () => import('./pages/index/OrderManage'),
                meta:{breadlist:['订单管理']}
            },
            {
                path: '/index/categories',
                name: 'index/categories',
                component: () => import('./pages/index/Categories'),
                meta:{breadlist:['商品管理','商品分类']}
            },
            {
                path: '/index/productList',
                name: 'index/productList',
                component: () => import('./pages/index/ProductList'),
                meta:{breadlist:['商品管理','商品列表']}
            },
            {
                path: '/index/productAdd',
                name: 'index/productAdd',
                component: () => import('./pages/index/ProductAdd'),
                meta:{breadlist:['商品管理','商品添加']}
            },
            {
                path: '/index/userList',
                name: 'index/userList',
                component: () => import('./pages/index/UserList'),
                meta:{breadlist:['用户管理','用户列表']}
            },
            ]
        },
        {
            path: '/',
            name: 'login',
            component: () => import('./pages/Login')
        },
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.path!='/'){//不在登录页  拦截
        checktoken(localStorage.token).then(res=>{
            if(res.data.code==0){
                next()
            }else{
                next('/')//token过期了 刷新页面会跳转到登录
            }
        })
    }else{//在登录页 显示
        next()
    }
})


export default router