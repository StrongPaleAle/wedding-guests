import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userSessionStore } from '@/stores/userSessionStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/register',
            name: 'register',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {
                needsAuth: 0
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: {
                needsAuth: 1
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
})
router.beforeEach(async (to, from, next) => {
    const userSession = userSessionStore()
    const canAccess = await userSession.canAccess(to)
    if (typeof to.meta.needsAuth !== 'number' || canAccess) {
        next()
    } else if (userSession.user?.id) {
        next({ name: 'home', params: { alert: 'noPermission' } })
    } else {
        next({ name: 'login', params: { alert: 'loginNeeded' } })
    }
})

export default router
