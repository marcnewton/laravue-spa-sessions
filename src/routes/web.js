import AuthLogin from '../components/auth/Login'

const routes = [
    {
        name: 'login',
        path: '/login',
        component: AuthLogin,
        meta: {
            noAuth: true,
            layout: 'default'
        }
    },
];

export default routes;
