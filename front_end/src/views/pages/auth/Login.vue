<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Greenovate Logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--green-500) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="logoUrl" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Admin!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <form @submit.prevent="signIn">
                            <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText id="username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5"
                                style="padding: 1rem" v-model="form_data.username" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="form_data.password" placeholder="Password"
                                :toggleMask="true" class="w-full mb-3" inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"></Password>

                            <Button label="Sign In" type="submit" class="w-full p-3 text-xl btn-success"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
<script>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { api } from '@/boot/axios';
import globalMixins from '@/mixins/global_mixins';
import UserStorage from '@/middleware/UserStorage';


export default {
    mixins: [globalMixins],
    components: {
        AppConfig
    },
    data: () => ({
        form_data: {
            username: '',
            password: '',
        },
    }),
    setup() {
        const { layoutConfig } = useLayout();

        const checked = ref(false);

        const logoUrl = computed(() => {
            return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
        });

        return {
            checked,
            logoUrl
        };
    },
    mounted() {
        // You can add mounted hook logic here if needed
        this.fetchData();
        // console.log(this.auth);

    },
    methods: {
        fetchData() {
            // const op = api.post('/api/logout');

            // console.log("TOKENS-->", op);
            // this.globalFunction.logout();
            // api.get('/api/auth')
            //     .then(response => {
            //         console.log("response-->", response.data);
            //     })
            //     .catch(error => {
            //         console.error("error-->", error);
            //     });
        },

        async signIn() {

            try {

                const response = await api.post('/api/login_v1', {
                    email: this.form_data.username,
                    password: this.form_data.password
                });
                let userStorage = new UserStorage();
                userStorage.setUserDetails({
                    token: response.data.token,
                    id: response.data.user.id,
                    username: response.data.user.email,
                    name: response.data.user.name,
                    otherDetails: response.data.user
                });
                // console.log('response.data', response.data.token); // Handle success response

                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('id', response.data.token);
                // localStorage.setItem('username', response.data.token);
                // localStorage.setItem('name', response.data.token);
                // localStorage.setItem('other_details', response.data.token);
                // Redirect to Home page
                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                console.error('error -->', error); // Handle error

            }
        }
    },
    computed: {
        // You can define computed properties here if needed
    }
};

</script>