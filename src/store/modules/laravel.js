const state = {
    version: 0,
    routes: [],
    translations: {}
};

const getters = {};

const actions = {};

const mutations = {

    routes (state,payload) {

        state.routes = payload;

    },

    translations (state,payload) {

        state.translations = payload;

    },

    version (state,payload) {

        state.version = payload;

    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
