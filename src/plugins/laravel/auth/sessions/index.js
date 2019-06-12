import { get, eachRight, replace } from 'lodash'
import { config } from '~/config'
import router from '~/router'

export default {

    install: (Vue, options = {

    }) => {

        Vue.prototype.$laravel = {

            login(input) {

                router.app.$store.commit('setAuthenticating', true);

                return new Promise((resolve, reject) => {

                    router.app.$http.post(route('login'), input).then(response => {

                        router.app.$store.commit('setUser', response.data.user, {root: true});
                        router.app.$store.commit('setAuthenticating', false);
                        resolve(response);

                    }).catch(error => {

                        router.app.$store.commit('setAuthenticating', false);
                        reject(error);

                    });

                });

            },

            logout() {

                router.app.$http.post(route('logout')).catch(error => {
                    // TODO Handle logout error
                    console.error(error);
                }).finally(() => {
                    this.checkAuth();
                });

            },

            recover(input) {

                return new Promise((resolve, reject) => {

                    router.app.$http.post(route('password.email'), {email: input.email})
                        .then(response => { resolve(response); })
                        .catch(error => { reject(error); });

                });

            },

            update(input) {

                return new Promise((resolve, reject) => {

                    router.app.$http.post(route('password.reset', {token: router.currentRoute.query.token}), {email: input.email}).then(response => {

                        router.push(router.currentRoute.query.redirect || config.redirectTo);
                        resolve(response);

                    }).catch(error => {

                        reject(error);

                    });

                });

            },

            checkAuth() {

                router.app.$store.commit('setAuthenticating', true);

                router.app.$http.get(this.route('app.user')).then(response => {

                    router.app.$store.commit('setUser', response.data, {root: true});

                    const redirect = router.currentRoute.query.hasOwnProperty('redirect') && !!router.currentRoute.query.redirect
                        ? router.currentRoute.query.redirect : router.currentRoute.path;

                    router.push(redirect, () => {
                        router.app.$store.commit('setAuthenticating', false, {root: true});
                    });

                }).catch(error => {

                    // TODO Handle error response, ignore codes handled by interceptor

                }).finally(() => {

                    router.app.$store.commit('setAuthenticating', false, {root: true});

                });

            },

            reset() {

                router.app.$store.commit('setUser', null, {root: true});
                router.app.$store.commit('setAuthenticated', false, {root: true});

            }

        };

        //router.app.$root.$on('unauthorized', window.Laravel.reset());
        //router.app.$root.$on('auth-timeout', window.Laravel.reset());

    }

};
