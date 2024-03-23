<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <!-- <img :src="logoUrl" alt="logo" /> -->
            <span class="text-white">HUMAN RESOURCES MONITORING SYSTEM</span>
        </router-link>

        <!-- <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button> -->

        <!-- <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button> -->

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="logout" class="p-link layout-topbar-button p-button-rounded bg-white log_out">
                <i class="pi pi-fw pi-sign-in layout-menuitem-icon"></i>
                <span class="logout-message">Logout</span>
            </button>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.logout-message {
    display: none;
    position: absolute;
    background-color: white;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    top: 100%;
    /* Position below the button */
    left: 50%;
    /* Center horizontally */
    transform: translateX(-50%);
    /* Center horizontally */
    z-index: 1;
}

.layout-topbar-menu:hover .logout-message {
    display: block;
}
</style>

<script>
import UserStorage from '@/middleware/UserStorage';
export default {
    filters: {},
    data() {
        return {
            outsideClickListener: null,
            topbarMenuActive: false
        };
    },
    mounted() {
        this.bindOutsideClickListener();
    },
    methods: {
        onTopBarMenuButton() {
            this.topbarMenuActive = !this.topbarMenuActive;
        },
        onSettingsClick() {
            this.topbarMenuActive = false;
            this.$router.push('/documentation');
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.topbarMenuActive = false;
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        isOutsideClicked(event) {
            if (!this.topbarMenuActive) return;

            const sidebarEl = document.querySelector('.layout-topbar-menu');
            const topbarEl = document.querySelector('.layout-topbar-menu-button');

            return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
        },
        logout() {

            let userStorage = new UserStorage();
            userStorage.removeUserDetails();
            this.$router.push({ name: 'login' });
        },
    },
    computed: {
        logoUrl() {
            return `/icons/logo1.png`;
        },
        topbarMenuClasses() {
            return {
                'layout-topbar-menu-mobile-active': this.topbarMenuActive
            };
        }
    }
}
</script>