import Vue from 'vue'
import {mapState} from 'vuex'

/**
 * https://lodash.com/docs
 */

import _ from 'lodash'
Vue.prototype._ = _;

/**
 * Import extensions
 */

import router from './router';
import store from './store';

Vue.config.productionTip = false;

/**
 * Import plugins
 */

import Http from './plugins/http'
Vue.use(Http);

import Laravel from './plugins/laravel'
Vue.use(Laravel);


/**
 * Initialize the main application
 */
import './layouts'
import './components'
import App from './App'

window.App = new Vue({

    render: h => h(App),
    store,
    router,

    data() {

        return {

            loading: 0

        }

    },

    beforeMount() {

        this.$laravel.initialize();

    },

    computed: {

        ...mapState(['user','isAuthenticating','isAuthenticated','isInitializing']),

        isLoading () {

            return this.loading > 0;

        }

    }

}).$mount('#app');

import './scss/app.scss'
