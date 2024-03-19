<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Pages',
        items: [
            {
                label: 'Employees Management',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Employees List',
                        to: '/employees_list'
                    },
                    {
                        label: 'Terminated Employees',
                        to: '/terminated_employees'
                    },
                ]
            },
            {
                label: 'Attendance Management',
                icon: 'pi pi-fw pi-calendar',
                to: '/attendance_management'
            },
            {
                label: 'Leave Management',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Leave List',
                        to: '/leave_list'
                    },
                    {
                        label: 'Leave Type',
                        to: '/leave_type'
                    }
                ]
            },
            {
                label: 'Payroll Management',
                icon: 'pi pi-fw pi-money-bill',
                to: '/payroll_management'
            },
            {
                label: 'Perforfance Monitoring',
                icon: 'pi pi-fw pi-chart-bar',
                to: '/performance_monitoring'
            },
            {
                label: 'Violation Management',
                icon: 'pi pi-fw pi-info-circle',
                to: '/violation_management'
            }
            
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>

    </ul>
</template>

<style lang="scss" scoped></style>
