import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {

        user: null,

        isAuthenticating: false,

        isAuthenticated: false,

        isInitializing: true,

        inMaintenance: false

    },

    mutations: {

        setUser(state,payload) {

            if(typeof payload !== 'object' || payload === null)
                return;

            state.user = payload;
            state.isAuthenticated = payload.hasOwnProperty('id');

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

    }

});

export default store;
