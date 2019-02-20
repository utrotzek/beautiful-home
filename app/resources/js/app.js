import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from '../views/App'
import Home from '../views/Home'
import Recipe from '../views/Recipe'

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/recipe',
            name: 'recipe',
            component: Recipe,
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});