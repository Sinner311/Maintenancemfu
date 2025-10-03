import 'core-js/stable'
import Vue from 'vue'
import CoreuiVuePro from '@coreui/vue-pro'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import i18n from './i18n.js'
import store from "@/store/store";

import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);

Vue.use(CoreuiVuePro)
Vue.prototype.$log = console.log.bind(console)
import moment from 'moment'
Vue.prototype.moment = moment


// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '225788483142-8pkg8on8nh60ao83ve33ff3lflv2ccvo.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
