import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import UserOnly from '../middleware/user_auth'; 
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/pages/dashboard/Dashboard.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/employees_list',
                    name: 'employees_list',
                    component: () => import('@/views/pages/employees/Employees_list.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/terminated_employees',
                    name: 'terminated_employees',
                    component: () => import('@/views/pages/employees/Terminated_employees.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/attendance_management',
                    name: 'attendance',
                    component: () => import('@/views/pages/attendance/Attendance.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/leave_list',
                    name: 'leave_list',
                    component: () => import('@/views/pages/leave/Leave_list.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/leave_type',
                    name: 'leave_type',
                    component: () => import('@/views/pages/leave/Leave_type.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/payroll_management',
                    name: 'payroll_management',
                    component: () => import('@/views/pages/payroll/Payroll_management.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/performance_monitoring',
                    name: 'performance_monitoring',
                    component: () => import('@/views/pages/monitoring/Performance_monitoring.vue'),
                    beforeEnter: [UserOnly]
                },
                {
                    path: '/violation_management',
                    name: 'violation_management',
                    component: () => import('@/views/pages/violation/Violation_management.vue'),
                    beforeEnter: [UserOnly]
                }
            ]
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue'),
            beforeEnter: [UserOnly]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            beforeEnter: [UserOnly]
        },
        {
            path: '/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue'),
            beforeEnter: [UserOnly]
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue'),
            beforeEnter: [UserOnly]
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!localStorage.getItem('token')) {
//             next({ name: 'login' }); // Redirect to login if not authenticated
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;