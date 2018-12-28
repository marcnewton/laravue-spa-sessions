import Vue from 'vue'

/**
 * Import available layouts.
 */

import LayoutInitializing from './views/initalizing'
Vue.component('layout-initializing', LayoutInitializing);

import LayoutAuthenticating from './views/authenticating'
Vue.component('layout-authenticating', LayoutAuthenticating);

import LayoutDefault from './views/default'
Vue.component('layout-default', LayoutDefault);
