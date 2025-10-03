import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/store";
import Service from "@/service/api";

const ServerModule = {
    namespaced: true,
    state: {
        item : []
    },

    mutations: {
        item(state, obj) {
            state.item = obj;
        }
    },

    actions: {
        config({commit}, data) {
            Service.members('exp', data, {})
                .then((response) => {
                    store.commit("account/item", response.data.data)
                }).catch((err) => {
            });
        },
        // create({commit}, data) {
        //     Service.campus('post', data, {})
        //         .then((response) => {
        //
        //         }).catch((err) => {
        //     });
        // },
        // update({commit}, data) {
        //     Service.campus('put', data, {})
        //         .then((response) => {
        //
        //         }).catch((err) => {
        //     });
        // },
    },

    getters: {
        item(state, obj) {
            return state.item;
        },
    },
};

export default ServerModule;
