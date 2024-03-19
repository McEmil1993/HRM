

export default
    {
        components: {

        },
        data: () => ({
         

        }),
        mounted() {
            // You can add mounted hook logic here if needed
            
        },
        computed: {
           

        },
        watch: {
            
           
        },
        methods: {
            // checkCookiesForSession() {
            //     let username = this.$q.localStorage.getItem("username");
            //     let nickname = this.$q.localStorage.getItem("nickname");
            //     let token = this.$q.localStorage.getItem("token");
            //     let money = this.$q.localStorage.getItem("money");
            //     let points = this.$q.localStorage.getItem("points");
            //     let route_access = this.$q.localStorage.getItem("route_access");
            //     let other_details = this.$q.localStorage.getItem("other_details");

            //     if (token) {
            //         this.auth.setAuth(username, nickname, token, money, points, other_details);
            //         this.auth.setRouteAccess(route_access);
            //     }
            // },
           
            // storeCredentials(username, nickname, token, money, points, other_details) {
            //     this.$q.localStorage.set("token", token);
            //     this.$q.localStorage.set("username", username);
            //     this.$q.localStorage.set("nickname", nickname);
            //     this.$q.localStorage.set("money", money);
            //     this.$q.localStorage.set("points", points);
            //     this.$q.localStorage.set("other_details", other_details);
            //     this.auth.setAuth(username, nickname, token, money, points, other_details);
            //     this.setAuthHeader();
            // },
            // storeRouteAccess(route_access) {
            //     this.$q.localStorage.set("route_access", route_access);
            //     this.auth.setRouteAccess(route_access);
            // },
            
            logout() {
                 console.log('OKE');
                // this.$q.localStorage.set("token", "");
                // this.$q.localStorage.set("id", "");
                // this.$q.localStorage.set("is_verified_secondary_password", false);
               
            },
            
        }
    }
