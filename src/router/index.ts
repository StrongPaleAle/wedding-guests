import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import { userSessionStore } from '@/stores/userSessionStore'
import { useAlerts } from '@/stores/alertsStore'
import type { AlertStyle } from '@/stores/alertsStore'
import { isAlertStyle } from '@/stores/alertsStore'

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
            path: '/email-confirmation',
            name: 'email-confirmation',
            component: () => import('../views/EmailConfirmationView.vue')
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView
        },
        {
            path: '/update-password',
            name: 'update-password',
            component: ResetPasswordView
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
        next({ name: 'home', params: { alert: 'noPermission', 'alert-type': 'error' } })
    } else {
        next({ name: 'login', params: { alert: 'loginNeeded', 'alert-type': 'error' } })
    }
    if (to.params.alert) {
        const alert = to.params.alert

        const alertType = isAlertStyle(to.params['alert-type'] as string)
            ? to.params['alert-type']
            : 'info'
        const alerts = useAlerts()
        alerts.notify(alert as string, alertType as AlertStyle)
    }
})

export default router
