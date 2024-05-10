import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import { userSessionStore } from '@/stores/userSessionStore'
import { useAlerts } from '@/stores/alertsStore'
import type { AlertStyle } from '@/stores/alertsStore'
import { isAlertStyle } from '@/stores/alertsStore'
import { i18n } from '@/main'

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
            path: '/rsvp',
            name: 'RSVP',
            component: () => import('../views/RSVPView.vue'),
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
            path: '/something-brewing',
            name: 'something-brewing',
            component: () => import('../views/TeaView.vue')
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
        history.pushState({ message: 'noPermission', alert_type: 'error' }, '')
        next({ name: 'home' })
    } else {
        history.pushState({ message: 'loginNeeded', alert_type: 'error' }, '')
        next({ name: 'login' })
    }
    if (history.state) {
        const message = history.state.message as string
        //console.log(message, history.state.alert_type, history.state)

        //console.log(message, history.state.alert_type)
        const alerts = useAlerts()
        const alertMessage = i18n.global.t(message) as string
        const alertStyle = isAlertStyle(history.state.alert_type)
            ? history.state.alert_type
            : 'info'

        alerts.notify(alertMessage, alertStyle as AlertStyle)
        history.replaceState(null, '')
    }
})

export default router
