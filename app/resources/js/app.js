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
            component: Home,
            meta: {
                breadcrumb: [
                    { name: 'home' }
                ]
            }
        },
        {
            path: '/recipe',
            name: 'recipe',
            component: Recipe,
            meta: {
                breadcrumb: [
                    { name: 'recipe' }
                ]
            }
        },
        {
            path: '/recipe/search',
            name: 'recipeSearch',
            component: RecipeSearch,
            meta: {
                breadcrumb: [
                    { name: 'recipe', link: '/recipe' },
                    { name: 'search' }
                ]
            }
        },
        {
            path: '/recipe/edit',
            name: 'recipeEdit',
            component: RecipeEdit,
            meta: {
                breadcrumb: [
                    { name: 'recipe', link: '/recipe' },
                    { name: 'edit' }
                ]
            }
        },
        {
            path: '/recipe/rate',
            name: 'recipeRate',
            component: RecipeRate,
            meta: {
                breadcrumb: [
                    { name: 'recipe', link: '/recipe' },
                    { name: 'rate' }
                ]
            }
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});