import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from '../views/App'
import Home from '../views/Home'
import Recipe from '../views/Recipe'
import RecipeEdit from '../views/Recipe/Edit'
import RecipeSearch from '../views/Recipe/Search'
import RecipeRate from '../views/Recipe/Rate'

Vue.config.devtools = true;

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
        {
            path: '/recipe/search',
            name: 'recipeSearch',
            component: RecipeSearch,
        },
        {
            path: '/recipe/edit',
            name: 'recipeEdit',
            component: RecipeEdit,
        },
        {
            path: '/recipe/rate',
            name: 'recipeRate',
            component: RecipeRate,
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});