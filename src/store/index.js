import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({

    namespaced: true,

    state: {

        user: null,

        isInitializing: true,

        isAuthenticating: true,

        isAuthenticated: false,

        inMaintenance: false

    },

    mutations: {

        setUser(state,payload) {

            if(typeof payload !== 'object')
                return;

            state.user = payload;
            state.isAuthenticated = Object.keys(state.user).length > 0;

        },

        setAuthenticating(state,payload) {

            state.isAuthenticating = payload;

        },

        setAuthenticated(state,payload) {

            state.isAuthenticated = payload;

        },

        setInitializing(state,payload) {

            state.isInitializing = payload;

        },

        setMaintenanceMode(state,payload) {

            state.inMaintenance = payload;

        }

    },

    getters: {

        user: state => {

            return state.user || {};

        }

    }

});

export default store;
