import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const HomeView = () => import('@/views/HomeView.vue')
const MenuView = () => import('@/views/MenuView.vue')
const CartView = () => import('@/views/CartView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const LoginView = () => import('@/views/LoginView.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Dashboard', subtitle: 'Visão geral de hoje' },
    },
    {
        path: '/menu',
        name: 'menu',
        component: MenuView,
        meta: { title: 'Cardápio', subtitle: 'Gerencie os itens do seu menu' },
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView,
        meta: {
            requiresAuth: true,
            title: 'Pedidos',
            subtitle: 'Revise e finalize seus pedidos',
        },
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: { title: 'Sobre', subtitle: 'Informações sobre o projeto' },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { title: 'Entrar', subtitle: 'Acesse sua conta', plain: true },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
})

export default router
