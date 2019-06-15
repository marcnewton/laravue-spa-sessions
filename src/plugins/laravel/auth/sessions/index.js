import Sessions from './module'
import store from '~/store'

import { mapActions } from 'vuex'

export const hook = (vm) => {

    vm.$on('app:initialized', () => {

        vm.authCheck();

    });

    vm.$on('hook:beforeUpdate', () => {

        alert('plugin on hook:beforeUpdate');

    });

    vm.$on('hook:updated', () => {

        alert('plugin on hook:updated');

    });

    vm.$on('hook:beforeDestroy', () => {

        alert('plugin on hook:beforeDestroy');

    });

    vm.$on('hook:destroyed', () => {

        alert('plugin on hook:destroyed');

    });

};

export default {

    install: (Vue, options = {

    }) => {

        store.registerModule('Laravel/Sessions', Sessions);

        Vue.mixin({

            methods: {

                ...mapActions({
                    authLogin: 'Laravel/Sessions/login',
                    authLogout: 'Laravel/Sessions/logout',
                    authCheck: 'Laravel/Sessions/check'
                })

            }

        });

    }

};
