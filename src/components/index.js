import Vue from 'vue'

/**
 * Import global components.
 */

import NotificationApp from '../plugins/notification/view';
Vue.component('notification-app', NotificationApp);

import vInputForm from './input/form'
Vue.component('v-input-form', vInputForm);
