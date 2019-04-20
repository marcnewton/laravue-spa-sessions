import axios from 'axios'
import router from '../../router'

const Http = {

    install(Vue, options = {
        baseURL: null
    }) {

        if(this.installed)
            return;

        this.installed = true;
        this.params = options;

        this.register(Vue);

        Vue.prototype.$http = axios;
        Vue.http = axios;
    },

    register(Vue) {

        if(this.params.baseURL)
            axios.defaults.baseURL = this.params.baseURL;

        if(this.params.hasOwnProperty('timeout'))
            axios.defaults.timeout = this.params.timeout;

        axios.defaults.withCredentials = true;

        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': undefined
        };

        // Add a request interceptor
        axios.interceptors.request.use(

            // Do something before request is sent
            function (config) {

                router.app.loading++;
                return config;

            },

            // Do something with request error
            function (error) {

                if (error.code !== 'ECONNABORTED')
                    router.app.serviceTimeouts = 0;

                router.app.loading--;

                if (router.app.loading < 0)
                    router.app.loading = 0;

                return Promise.reject(error);

            }
        );

        axios.interceptors.response.use(

            function (response) {

                if(response.headers.hasOwnProperty('x-csrf-token')) {

                    const token = response.headers['x-csrf-token'];

                    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
                    router.app.$Laravel.csrfToken = token;
                }

                router.app.loading--;

                if (router.app.loading < 0)
                    router.app.loading = 0;

                return response;

            },

            function (error) {

                if(typeof error !== 'object' || !error.response) {

                    router.app.loading--;

                    if (router.app.loading < 0)
                        router.app.loading = 0;

                if (error.code === 'ECONNABORTED') {
                    router.app.serviceTimeouts++;

                    if(router.app.serviceTimeouts <= 3)
                        return axios.request(error.config);
                }

                if(typeof error !== 'object' || !error.response)
                    return Promise.reject(error);
                }

                if(error.response.hasOwnProperty('status')) {

                    switch(error.response.status) {

                        case 401: // Unauthorized
                            router.app.$Laravel.logout();
                            break;

                        case 419: // Authentication Timeout
                            router.app.$Laravel.logout();
                            break

                    }

                }

                router.app.loading--;

                if (router.app.loading < 0)
                    router.app.loading = 0;

                return Promise.reject(error);

            }

        );

    }

};

export default Http;
