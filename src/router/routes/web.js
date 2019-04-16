const AuthLogin = () => import('~/components/auth/Login');
const Home = () => import('~/components/pages/Home');

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
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            layout: 'default'
        }
    }
];

export default routes;
