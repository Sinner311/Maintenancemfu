import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import DialogMessages from "./modules/Dialog/index";
import Setting from './modules/Setting/index'


import Campus from "@/store/modules/Setting/education/Campus";
import Facultys from "@/store/modules/Setting/education/Facultys";
import Departments from "@/store/modules/Setting/education/Departments";


import Accounts from "@/store/modules/Accounts/index";
import settingRoles from "@/store/modules/Setting/roles";

import Application from "@/store/modules/Applications/index";

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}


export default new Vuex.Store({
  state,
  mutations,
  modules : {
    dialog: DialogMessages,
    setting : Setting,


    campus : Campus,
    faculty : Facultys,
    departent : Departments,


    account : Accounts,

    roles : settingRoles,


    // application

    application: Application,

  }
});
