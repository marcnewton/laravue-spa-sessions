import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {

        user: {
            id: null
        },

        isAuthenticated: false,

        isInitializing: true,

        inMaintenance: false

    },

    mutations: {

        setUser(state,payload) {

            state.user = payload;
            state.isAuthenticated = !!payload.id;

        },

        setInitializing(state,payload) {

            state.isInitializing = payload;

        },

        setMaintenanceMode(state,payload) {

            state.inMaintenance = payload;

        }

    }

});

export default store;
