import router from '../../router'
import _ from 'lodash';

export default {

    install: (Vue) => {

        Vue.prototype.$Laravel = new Vue({

            data: () => ({

                csrfToken: ''

            }),

            methods: {

                initialize: function () {

                    router.app.$store.commit('setInitializing',true);

                    router.app.$http.get('/app').then(response => {

                        if(response.data.hasOwnProperty('routes'))
                            router.app.$store.commit('Laravel/routes', response.data.routes);

                        if(response.data.hasOwnProperty('translations'))
                            router.app.$store.commit('Laravel/translations', response.data.translations);

                        if(response.data.hasOwnProperty('version'))
                            router.app.$store.commit('Laravel/version', response.data.version);

                        // TODO check routes are set else set init failed state.
                        router.app.$store.commit('setInitializing',false);

                        this.checkAuth();

                    }).catch(error => {

                        // TODO : Handle error
                        console.error(error, 'data', error.data, 'code',error.code);

                        // TODO pickup if timeout
                        router.app.$store.commit('setInitializing','offline');

                    });

                },

                checkAuth: function () {

                    router.app.$store.commit('setAuthenticating',true);

                    router.app.$http.get(route('api.user')).then(response => {

                        router.app.$store.commit('setUser', response.data);

                        if (router.app.isAuthenticated) {

                            const redirect = router.currentRoute.query.hasOwnProperty('redirect') && !!router.currentRoute.query.redirect
                                ? router.currentRoute.query.redirect : router.currentRoute.path;

                            router.push(redirect, () => {
                                router.app.$store.commit('setAuthenticating',false);
                            });

                        }

                    }).catch(error => {

                        // TODO Handle error response
                        router.app.$store.commit('setUser',{ id: null });

                    }).finally(() => {

                        router.app.$store.commit('setAuthenticating',false);

                    });

                },

                login: function (input) {

                    router.app.$store.commit('setAuthenticating',true);

                    return router.app.$http.post(route('login'), input).then(response => {

                        const redirect = router.currentRoute.query.hasOwnProperty('redirect') && router.currentRoute.query.redirect
                            ? router.currentRoute.query.redirect : router.currentRoute.path;

                        router.app.$store.commit('setUser', response.data.user);

                        router.push(redirect);

                    }).finally(() => {

                        router.app.$store.commit('setAuthenticating',false);

                    });

                },

                verify: function (input) {

                    router.app.$store.commit('setAuthenticating',true);

                    return router.app.$http.post(route('login'), input).then(response => {

                        router.app.$store.commit('setUser', response.data.user);

                    }).finally(() => {

                        router.app.$store.commit('setAuthenticating',false);

                    });

                },

                logout: function (soft = false) {

                    if (soft === true) {

                        router.app.$store.commit('setUser',{ id: null });

                        const login = router.resolve({ name: 'login' });
                        const redirect = router.currentRoute.path === login.location.path ? '/' : router.currentRoute.path;

                        router.push({
                            name: 'login',
                            query: {
                                redirect: redirect
                            }
                        });

                        return;
                    }

                    router.app.$http.get(route('logout')).then(response => {

                        this.$nextTick(() => {
                            // We have to redirect because Laravel does not return a fresh token on a logout response.
                            // TODO Find alternative solution to redirect.
                            window.location.href = '/';
                        });

                    }).catch(error => {
                        console.error(error);
                    });

                },

                recover: function (input) {

                    router.app.$http.post(route('password.update'), input).then(response => {

                        router.app.$store.commit('setUser', response.data.user);

                        router.push(router.currentRoute.query.redirect || '/');

                    }).catch(error => {
                        // TODO Handle errors
                    });

                },

                getUser(refresh) {

                    if (router.app.isAuthenticated && !refresh) {
                        return;
                    }

                    router.app.$http.get(route('api.user')).then(response => {

                        router.app.$store.commit('setUser', response.data);

                    }).catch(error => {
                        window.ErrorHandler(router.app, error);
                    });

                },

                route() {

                    const args = Array.prototype.slice.call(arguments);
                    const name = args.shift();

                    if (router.app.$store.state.Laravel.routes.hasOwnProperty(name) === false) {
                        console.error('Unknown route ', name);
                        return undefined;
                    } else {
                        return '/' + router.app.$store.state.Laravel.routes[name].split('/').map(s => s[0] === '{' ? args.shift() : s).join('/');
                    }

                },

                translate: function (string, args) {

                    let value = _.get(router.app.$store.state.Laravel.translations, string);

                    _.eachRight(args, (paramVal, paramKey) => {
                        value = _.replace(value, `:${paramKey}`, paramVal);
                    });

                    return value;

                }

            }

        });

        // Global shorthand helpers

        window.Laravel = Vue.prototype.$Laravel;
        window.route = Vue.prototype.$Laravel.route;
        window.trans = Vue.prototype.$Laravel.translate;

        // Vue bind helpers

        Vue.trans = Vue.prototype.$Laravel.translate;
        Vue.prototype.$trans = Vue.prototype.$Laravel.translate;
    }

};
