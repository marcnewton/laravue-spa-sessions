import router from '../../router'
import _ from 'lodash';

export default {

    install: (Vue) => {

        Vue.prototype.$Laravel = new Vue({

            data: () => ({
                csrfToken: '',
                version: 0,
                routes: [],
                translations: {}
            }),

            methods: {

                initialize: function () {

                    router.app.$store.commit('setInitializing',true);

                    router.app.$http.get('/app').then(response => {

                        if(response.data.hasOwnProperty('routes'))
                            router.app.$set(router.app.$Laravel, 'routes', response.data.routes);

                        if(response.data.hasOwnProperty('translations'))
                            router.app.$set(router.app.$Laravel, 'translations', response.data.translations);

                        if(response.data.hasOwnProperty('version'))
                            router.app.$set(router.app.$Laravel, 'version', response.data.version);

                        router.app.$store.commit('setInitializing',false);

                        this.checkAuth();

                    }).catch(error => {

                        // TODO : Handle error
                        console.error(error, 'data', error.data, 'code',error.code);

                        // TODO pickup if timeout
                        router.app.$store.commit('setInitializing','retry');

                        setTimeout(this.initialize,2500);

                    });

                },

                checkAuth: function () {

                    router.app.$set(router.app,'isAuthenticating',true);

                    router.app.$http.get(route('get.user')).then(response => {

                        router.app.$store.commit('setUser', response.data);

                        if (router.app.isAuthenticated) {

                            const redirect = router.currentRoute.query.hasOwnProperty('redirect') && !!router.currentRoute.query.redirect
                                ? router.currentRoute.query.redirect : router.currentRoute.path;

                            router.push(redirect, () => {
                                router.app.$set(router.app, 'isAuthenticating', false);
                            });

                        }

                    }).catch(error => {

                        // TODO Handle error response
                        router.app.$store.commit('setUser',{ id: null });

                    }).finally(() => {

                        router.app.$set(router.app, 'isAuthenticating', false);

                    });

                },

                login: function (input) {

                    router.app.$set(router.app, 'isAuthenticating', true);

                    return router.app.$http.post(route('login.send'), input).then(response => {

                        const redirect = router.currentRoute.query.hasOwnProperty('redirect') && router.currentRoute.query.redirect
                            ? router.currentRoute.query.redirect : router.currentRoute.path;

                        router.app.$store.commit('setUser', response.data.user);

                        router.push(redirect);

                    }).finally(() => {

                        router.app.$set(router.app, 'isAuthenticating', false);

                    });

                },

                verify: function (input) {

                    router.app.$set(router.app, 'isAuthenticating', true);

                    return router.app.$http.post(route('login.send'), input).then(response => {

                        router.app.$store.commit('setUser', response.data.user);

                    }).finally(() => {

                        router.app.$set(router.app, 'isAuthenticating', false);

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

                    router.app.$http.post('/password/recover', input).then(response => {

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

                    router.app.$http.get(route('get.user')).then(response => {

                        router.app.$store.commit('setUser', response.data);

                    }).catch(error => {
                        window.ErrorHandler(router.app, error);
                    });

                },

                route() {

                    const args = Array.prototype.slice.call(arguments);
                    const name = args.shift();

                    if (this.routes[name] === undefined) {
                        console.error('Unknown route ', name);
                        return undefined;
                    } else {
                        return '/' + this.routes[name].split('/').map(s => s[0] === '{' ? args.shift() : s).join('/');
                    }

                },

                translate: function (string, args) {

                    let value = _.get(this.translations, string);

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
