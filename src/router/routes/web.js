const Home = () => import('~/components/pages/Home');

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            layout: 'default'
        }
    },
    {
        name: 'example',
        path: '/example',
        meta: {
            layout: 'default',
            noAuth: true
        }
    }
];

export default routes;
