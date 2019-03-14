<template>
    <div>
        <Headline text="Rezepte suchen" />
        <ShoppingCart
            :shopping-cart="shoppingCart"
            @createShoppingList="handleCreateShoppingList()"
        />

        <div class="main-content">
            <div id="searchForm">
                <div class="row justify-content-md-center">
                    <div class="col-12">
                        <form class="form-inline justify-content-md-center">
                            <label
                                class="sr-only"
                                for="inlineFormInput"
                            >Name des Rezepts</label>
                            <input
                                id="inlineFormInput"
                                type="text"
                                class="form-control wider mb-2 mr-sm-2 mb-md-0"
                                placeholder="Name des Rezepts"
                            >

                            <button
                                type="submit"
                                class="btn btn-primary mr-2"
                            >
                                <i class="fas fa-search"></i>
                                Submit
                            </button>
                            <button
                                type="submit"
                                class="btn btn-secondary"
                            >
                                <i class="far fa-grin-beam-sweat"></i>
                                <span class="d-none d-md-inline">Überrasch mich</span>
                                <span class="d-sm-inline d-md-none">Zufall</span>
                            </button>

                            <a
                                class="m-0 btn btn-link"
                                data-toggle="collapse"
                                href="#extendedSearch"
                                role="link"
                                aria-expanded="false"
                                aria-controls="extendedSearch"
                            >
                                <i class="fas fa-cogs"></i>
                                Erweiterte Suchoptionen
                            </a>
                        </form>
                    </div>
                </div>
            </div>

            <div
                id="extendedSearch"
                class="collapse"
            >
                <hr>
                <h3>Suchfilter einschränken</h3>
                <div class="row justify-content-md-center">
                    <div class="col-md-10 col-xs-12">
                        <form>
                            <div class="row mt-2">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Mindestbewertung</label>
                                        <select
                                            id="formGroupExampleInput"
                                            class="form-control"
                                        >
                                            <option>unbewertet</option>
                                            <option>1 Stern</option>
                                            <option>2 Sterne</option>
                                            <option>3 Sterne</option>
                                            <option>4 Sterne</option>
                                            <option>5 Sterne</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Merkmale</label>
                                        <div class="form-check">
                                            <input
                                                id="defaultCheck1"
                                                class="form-check-input"
                                                type="checkbox"
                                                value=""
                                            >
                                            <label
                                                class="form-check-label"
                                                for="defaultCheck1"
                                            >
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                id="defaultCheck1"
                                                class="form-check-input"
                                                type="checkbox"
                                                value=""
                                            >
                                            <label
                                                class="form-check-label"
                                                for="defaultCheck1"
                                            >
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                id="defaultCheck1"
                                                class="form-check-input"
                                                type="checkbox"
                                                value=""
                                            >
                                            <label
                                                class="form-check-label"
                                                for="defaultCheck1"
                                            >
                                                Default checkbox
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Nicht gekocht seit</label>
                                        <select
                                            id="formGroupExampleInput"
                                            class="form-control"
                                        >
                                            <option>egal</option>
                                            <option>1 Monat</option>
                                            <option>2 Monate</option>
                                            <option>3 Monate</option>
                                            <option>länger</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput2">Another label</label>
                                        <input
                                            id="formGroupExampleInput2"
                                            type="text"
                                            class="form-control"
                                            placeholder="Another input"
                                        >
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div
                id="searchResult"
                class="mt-5"
            >
                <hr>
                <h2>{{ recipies.length }} Rezepte gefunden</h2>

                <div class="row">
                    <div
                        v-for="item in recipies"
                        :key="item.id"
                        class="col-md-4"
                    >
                        <SearchResultEntry
                            :recipe="item"
                            @add-to-cart="addRecipeToCart(item)"
                        />
                    </div>
                </div>
            </div>

            <div
                id="pagination"
                class="d-flex justify-content-center"
            >
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="#"
                            >Previous</a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="#"
                            >1</a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="#"
                            >2</a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="#"
                            >3</a>
                        </li>
                        <li class="page-item">
                            <a
                                class="page-link"
                                href="#"
                            >Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import RecipiesData from "../../js/data/Recipies";
import ShoppingCartData from "../../js/data/ShoppingCart";

import SearchResultEntry from "../../js/components/recipe/RecipeThumbnail";
import ShoppingCart from "../../js/components/recipe/ShoppingCart";

export default {
    components: {
        SearchResultEntry,
        ShoppingCart
    },
    data () {
        return {
            recipies: RecipiesData,
            shoppingCart: ShoppingCartData
        };
    },
    methods: {
        addRecipeToCart(recipe) {
            for (let i= 0; i < this.shoppingCart.length; i++){
                if (recipe.id === this.shoppingCart[i].recipe.id){
                    this.shoppingCart[i].count++;
                    return;
                }
            }
            this.shoppingCart.push({
                count: 1,
                recipe: recipe
            });
        },
        handleCreateShoppingList() {
            let ingredientsList = [];

            for (let i=0; i < this.shoppingCart.length; i++){
                ingredientsList.push(this.shoppingCart[i].ingredients);
            }

            //CITEQ_TODO: store to api
            this.$router.push("/shoppingList");
        }
    }
};
</script>