import { defineStore } from 'pinia';

export const userAuth = defineStore('counter', {
  state: () => ({
    token: "",
    email: "",
    name: "",
    other_details: {},
  }),

  getters: {
  },

  actions: {

    setAuth(email:string, name:string, token:string, other_details: object) {
      this.email = email;
      this.name = name;
      this.token = token;
      this.other_details = other_details;
    },
    removeAuth() {
      this.email = "";
      this.name = "";
      this.token = "";
      this.other_details = {};
    }
  }
});
