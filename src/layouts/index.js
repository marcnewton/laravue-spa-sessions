import Vue from 'vue'

/**
 * Import available layouts.
 */
import LayoutLogin from './views/login';
Vue.component('layout-login', LayoutLogin);

import LayoutUnauthorized from './views/unauthorized';
Vue.component('layout-unauthorized', LayoutUnauthorized);

import LayoutMaintenance from './views/maintenance'
Vue.component('layout-maintenance', LayoutMaintenance);

import LayoutInitializing from './views/initalizing'
Vue.component('layout-initializing', LayoutInitializing);

import LayoutDefault from './views/default'
Vue.component('layout-default', LayoutDefault);
