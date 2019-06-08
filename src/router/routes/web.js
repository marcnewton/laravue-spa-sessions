const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('~/components/pages/Welcome'),
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
