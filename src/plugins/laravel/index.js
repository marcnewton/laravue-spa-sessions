import config from '~/config'
import router from '../../router'

import _ from 'lodash'

export default {

    install: (Vue) => {

        Vue.prototype.$laravel = new Vue({

            data: () => ({

                csrfToken: '',
                version: 0,
                routes: [],
                translations: {}

            }),

            methods: {

                login(input) {

                    router.app.$store.commit('setAuthenticating', true);

                    return new Promise((resolve, reject) => {

                        router.app.$http.post(route('login'), input).then(response => {

                            router.app.$store.commit('setUser', response.data.user, {root: true});
                            resolve(response);

                        }).catch(error => {

                            reject(error);

                        }).finally(() => {

                            router.app.$store.commit('setAuthenticating', false);

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

                        router.app.$http.post(route('password.update'), input).then(response => {

                            router.push(router.currentRoute.query.redirect || config.redirectTo);
                            resolve(response);

                        }).catch(error => {

                            reject(error);

                        });

                    });

                },

                initialize() {

                    router.app.$store.commit('setInitializing', true, {root: true});

                    router.app.$http.get(config.requestPrefix).then(response => {

                        if (response.data.hasOwnProperty('routes'))
                            this.$set(this, 'routes', response.data.routes);

                        if (response.data.hasOwnProperty('translations'))
                            this.$set(this, 'translations', response.data.translations);

                        if (response.data.hasOwnProperty('version'))
                            this.$set(this, 'version', response.data.version);

                        // TODO check routes are set else set init failed state.
                        router.app.$store.commit('setInitializing', false, {root: true});

                    }).catch(error => {

                        // TODO : Handle error
                        console.error(error, 'data', error.data, 'code', error.code);

                        // TODO pickup if timeout
                        router.app.$store.commit('setInitializing', 'offline', {root: true});

                    }).finally(() => {

                        this.checkAuth();

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

                },

                route() {

                    const args = Array.prototype.slice.call(arguments);
                    const name = args.shift();

                    let route = this.routes.find(item => item.name === name);

                    if (!!!route) {
                        console.error('Unknown route ', name);
                        return '404';
                    }

                    return '/' + route.uri.split('/').map(s => s[0] === '{' ? args.shift() : s).join('/');

                },

                translate(string, args) {

                    let value = _.get(this.translations, string);

                    _.eachRight(args, (paramVal, paramKey) => {
                        value = _.replace(value, `:${paramKey}`, paramVal);
                    });

                    return value;

                }


            }

        });

        // Create reference to root instance from Laravel instance.

        Vue.mixin({

            data: () => ({
                laravel: Vue.prototype.$laravel.$data
            })

        });

        // Global shorthand helpers

        window.Laravel = Vue.prototype.$laravel;
        window.route = Vue.prototype.$laravel.route;
        window.trans = Vue.prototype.$laravel.translate;

        // Vue template bind helpers

        Vue.trans = Vue.prototype.$laravel.translate;
        Vue.prototype.$trans = Vue.prototype.$laravel.translate;
    }

};
