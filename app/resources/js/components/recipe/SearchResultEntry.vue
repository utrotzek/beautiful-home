<template>
    <div class="searchResultItem">
        <div class="row">
            <div class="col-4">
                <img :src="recipe.image_src" class="img-fluid img-thumbnail rounded-circle"/>
            </div>
            <div class="col">
                <a href="#"> {{ recipe.title }}</a>

                <div class="rating">
                    <i
                        v-for="n in recipe.rating"
                        class="fas fa-star">
                    </i>

                    <i v-for="n in 5 - recipe.rating"
                       class="fas fa-star-half-alt">
                    </i>
                </div>
                <div class="prepTime">
                    <i class="fas fa-clock"></i>
                    {{ recipe.preparationTime}}
                </div>
                <div class="calorie">
                    {{ recipe.calorie }} kcal ( {{ recipe.calorie * 4.2 }} kJ)
                </div>
                <div class="nutrient">
                    Fett: {{ recipe.nutrient.fat }}g KH {{ recipe.nutrient.carbohydrates }}g Eiweiß {{ recipe.nutrient.protein }}g
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <div class="btn-group d-flex" role="group" aria-label="Basic example">
                    <button @click="addToCart" type="button" class="btn btn-light">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="d-none d-sm-inline">In den Einkaufswagen</span>
                    </button>
                    <button type="button" class="btn btn-light">
                        <i class="fas fa-edit"></i>
                        <span class="d-none d-sm-inline">Bearbeiten</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        methods: {
            addToCart () {
                this.$emit('add-to-cart')
            }
        },
        data () {
            return {
            }
        }
    }
</script>