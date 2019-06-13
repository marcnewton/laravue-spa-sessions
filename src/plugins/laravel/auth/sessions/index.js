import Sessions from './module'
import store from '~/store'

import { mapActions } from 'vuex'

export default {

    install: (Vue, options = {

    }) => {

        store.registerModule('Laravel/Sessions', Sessions);

        Vue.mixin({

            methods: {

                ...mapActions({
                    authLogin: 'Laravel/Sessions/login',
                    authLogout: 'Laravel/Session/logout',
                    authCheck: 'Laravel/Session/'
                })

            }

        });

    }

};
