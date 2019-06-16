export const config = {

    initialization: true,
    authentication: true,

    mountAppTo: '#app',
    requestPrefix: '/app',
    defaultRedirect: '/',

};

export const plugins = {

    axios: {
        enabled: true
    },

    laravel: {
        enabled: true
    },

    notification: {
        enabled: true,
        timeout: 9000
    },

    ckeditor: {
        enabled: false
    }

};
