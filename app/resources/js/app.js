import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from '../views/App'
import Home from '../views/Home'
import Recipe from '../views/Recipe'
import RecipeEdit from '../views/Recipe/Edit'
import RecipeSearch from '../views/Recipe/Search'
import RecipeRate from '../views/Recipe/Rate'
import ShoppingList from '../views/Recipe/ShoppingList'

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
            meta: {
                breadcrumb: [
                    { name: 'Rezepte' }
                ]
            }
        },
        {
            path: '/recipe/search',
            name: 'recipeSearch',
            component: RecipeSearch,
            meta: {
                breadcrumb: [
                    { name: 'Rezepte', link: '/recipe' },
                    { name: 'Suche' }
                ]
            }
        },
        {
            path: '/recipe/edit',
            name: 'recipeEdit',
            component: RecipeEdit,
            meta: {
                breadcrumb: [
                    { name: 'Rezepte', link: '/recipe' },
                    { name: 'Eingabe' }
                ]
            }
        },
        {
            path: '/recipe/rate',
            name: 'recipeRate',
            component: RecipeRate,
            meta: {
                breadcrumb: [
                    { name: 'Rezepte', link: '/recipe' },
                    { name: 'Bewertung' }
                ]
            }
        },
        {
            path: '/recipe/shoppingList',
            name: 'recipeShoppingList',
            component: ShoppingList,
            meta: {
                breadcrumb: [
                    { name: 'Rezepte', link: '/recipe' },
                    { name: 'Einkaufsliste' }
                ]
            }
        },
    ],
});


//add global components
import Headline from './components/Headline'
Vue.component('Headline', Headline);

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router,
});