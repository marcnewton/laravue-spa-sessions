import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const Laravel = {

    namespaced: true,

    state: {

        version: 0,
        routes: [],
        translations: {}

    },

    mutations: {

        routes (state,payload) {

            state.routes = payload;

        },

        translations (state,payload) {

            state.translations = payload;

        },

        version (state,payload) {

            state.version = payload;

        }

    }

};


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

    },

    modules: {

        Laravel: Laravel

    }

});

export default store;
