import Vue from "vue";
import VueRouter from "vue-router";
import filters from "../js/filters";

Vue.use(VueRouter);
Vue.use(filters);

import App from "../views/App";
import Home from "../views/Home";
import Finance from "../views/Finance";
import Accounting from "../views/Finance/Accounting";
import Recipe from "../views/Recipe";
import RecipeEdit from "../views/Recipe/Edit";
import RecipeSearch from "../views/Recipe/Search";
import RecipeRate from "../views/Recipe/Rate";
import ShoppingList from "../views/ShoppingList";

const router = new VueRouter({
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/finance",
            name: "finance",
            component: Finance,
            meta: {
                breadcrumb: [
                    { name: "Finanzen" }
                ]
            }
        },
        {
            path: "/finance/accounting",
            name: "accounting",
            component: Accounting,
            meta: {
                breadcrumb: [
                    { name: "Finanzen / Buchhaltung" }
                ]
            }
        },
        {
            path: "/recipe",
            name: "recipe",
            component: Recipe,
            meta: {
                breadcrumb: [
                    { name: "Rezepte" }
                ]
            }
        },
        {
            path: "/recipe/search",
            name: "recipeSearch",
            component: RecipeSearch,
            meta: {
                breadcrumb: [
                    { name: "Rezepte", link: "/recipe" },
                    { name: "Suche" }
                ]
            }
        },
        {
            path: "/recipe/edit",
            name: "recipeEdit",
            component: RecipeEdit,
            meta: {
                breadcrumb: [
                    { name: "Rezepte", link: "/recipe" },
                    { name: "Eingabe" }
                ]
            }
        },
        {
            path: "/recipe/rate",
            name: "recipeRate",
            component: RecipeRate,
            meta: {
                breadcrumb: [
                    { name: "Rezepte", link: "/recipe" },
                    { name: "Bewertung" }
                ]
            }
        },
        {
            path: "/shoppingList",
            name: "shoppingList",
            component: ShoppingList,
            meta: {
                breadcrumb: [
                    { name: "Einkaufsliste" }
                ]
            }
        },
    ],
});

Vue.directive("focus", {
    inserted: function (el) {
        //focus element which was inserted into the DOM
        el.focus();
    }
});

//add global components
import Headline from "./components/Headline";
Vue.component("Headline", Headline);

/* eslint-disable no-unused-vars */
const app = new Vue({
    el: "#app",
    components: {
        App
    },
    router,
});
/* eslint-enable no-unused-vars */
