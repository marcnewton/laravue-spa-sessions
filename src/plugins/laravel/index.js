import Laravel from './module'
import store from '~/store'
import axios from 'axios'

import { mapActions } from 'vuex'
import { config } from '~/config'

export default {

    install: (Vue, options = {}) => {

        store.commit('setInitializing', true, {root: true});

        store.registerModule('Laravel', Laravel);

        axios.get(config.requestPrefix).then(response => {

            store.commit('setOffline', false, {root: true});

            if (response.data.hasOwnProperty('routes'))
                store.commit('Laravel/setRoutes', response.data.routes);

            if (response.data.hasOwnProperty('translations'))
                store.commit('Laravel/setTranslations', response.data.translations);

            if (response.data.hasOwnProperty('version'))
                store.comit('Laravel/setVersion', response.data.version);

            // TODO check routes are set else set init failed state.

        }).catch(error => {

            // TODO : Handle error
            console.error(error, 'data', error.data, 'code', error.code);

            // TODO pickup if timeout
            store.commit('setOffline', true, {root: true});

        }).finally(() => {

            store.commit('setInitializing', false, {root: true});

        });

        Vue.mixin({

            methods: {

                ...mapActions({
                    route: 'Laravel/route',
                    trans: 'Laravel/trans',
                    __: 'Laravel/trans'
                })

            }

        });

        // Laravel Echo Support
        window.Laravel = {

            csrfToken: window.csrfToken

        };

    }

};
