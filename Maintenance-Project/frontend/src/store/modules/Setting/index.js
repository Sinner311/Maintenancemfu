import Vue from "vue";
import Vuex from "vuex";
import Service from "../../../service/api.js";
import router from "../../../router/index.js";
import store from "@/store/store";

const module = {
    namespaced: true,
    state: {
        lang : "en",


    },

    mutations: {
        lang(state, obj) {
            state.lang = obj;
        },
    },

    actions: {

    },

    getters: {
        lang(state, obj) {
            return state.lang;
        },

    },
};
export default module;
