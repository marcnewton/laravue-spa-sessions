import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes/web'

Vue.use(Router);

let router = new Router({

    mode: 'history',
    routes: Routes

});

router.beforeEach((to, from, next) => {

    if (to.meta.hasOwnProperty('noAuth') === false && router.app.isAuthenticated === false) {

        next({
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        });

        return;
    }

    next();

});

router.afterEach((to,from) => {

    document.title = !!!to.meta.title ? '' : to.meta.title;

});

export default router;
