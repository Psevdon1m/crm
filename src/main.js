import Vue from "vue";
import Vuelidate from "vuelidate"
import App from "./App.vue";

import router from "./router";
import store from "./store/index";
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import messagePlugin from '@/utils/message.plugin';
import vuetify from "./plugins/vuetify";
import Loader from "@/components/app/Loader"
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min"

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyCiZ57CF6O5ypUkVxChsrgwZai6Id5yY10",
  authDomain: "v-course-crm.firebaseapp.com",
  databaseURL: "https://v-course-crm.firebaseio.com",
  projectId: "v-course-crm",
  storageBucket: "v-course-crm.appspot.com",
  messagingSenderId: "582117120670",
  appId: "1:582117120670:web:38219e4d44506166e7f98f"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app")
  }
  
})
