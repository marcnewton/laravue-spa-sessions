import Vue from 'vue';

import Http from './http'
Vue.use(Http);

import Laravel from './laravel'
Vue.use(Laravel);

import { plugins } from '~/config'

console.log('plugins', plugins);

const iterator = require.context('.', false, /w+/);

iterator.keys().forEach(dir => {

    console.log('dir',dir);

});
