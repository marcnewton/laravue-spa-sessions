import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import Laravel from './modules/laravel'


const store = new Vuex.Store({

    state: {

        user: {
            id: null
        },

        isAuthenticating: false,

        isAuthenticated: false,

        isInitializing: true,

        inMaintenance: false

    },

    mutations: {

        setUser(state,payload) {

            if(typeof payload !== 'object')
                return;

            state.user = payload;
            state.isAuthenticated = !!payload.id;

        },

        setAuthenticating(state,payload) {

            state.isAuthenticating = payload;

        },

        setInitializing(state,payload) {

            state.isInitializing = payload;

        },

        setMaintenanceMode(state,payload) {

            state.inMaintenance = payload;

        }

    },

    modules: {
        Laravel
    }

});

export default store;
