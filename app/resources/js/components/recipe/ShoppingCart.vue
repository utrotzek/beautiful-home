<template>
    <div>
        <div id="cart" class="d-flex justify-content-end" ref="cartElement" >
            <a class="btn btn-light" data-toggle="modal" data-target="#shoppingCartModal" href="#">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-info">{{ shoppingCartCount }}</span>
            </a>
        </div>
        <div class="modal fade" id="shoppingCartModal" tabindex="-1" role="dialog" aria-labelledby="shoppingCartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="shoppingCartModalLabel">Einkaufwagen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <ul
                                        v-if="shoppingCart.length > 0"
                                        class="list-group">
                                    <li
                                        class="list-group-item"
                                        v-for="entry in shoppingCart">

                                        <div class="row">
                                            <div class="col-md-3 col-sm-12">
                                                <div>
                                                    <span>{{ entry.count }} Portionen</span>
                                                    <button @click="increaseCount(entry)" class="btn btn-light btn-sm d-inline-block">
                                                        <i class="fas fa-plus-circle"></i>
                                                    </button>
                                                    <button @click="decreaseCount(entry)" class="btn btn-light btn-sm d-inline-block">
                                                        <i class="fas fa-minus-circle"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <SearchResultEntry :recipe="entry.recipe" :enableButtons="false" :enableDeleteButton="true" @remove="removeRecipeFromCart(item)"></SearchResultEntry>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <p v-else>
                                    Ihr Einskaufwagen ist leer
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                                type="button"
                                class="btn btn-primary"
                                :class="{ disabled: !hasEntries}"
                        >
                            Einkaufsliste erstellen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchResultEntry from './SearchResultEntry';

    export default {
        components: {
            SearchResultEntry
        },
        props: {
            shoppingCart:  {
                type: Array,
                required: true
            }
        },
        watch: {
            'shoppingCart' () {
                let cart = $('#cart');

                cart.addClass('cartAnimation');
                setTimeout(function(){
                    cart.removeClass('cartAnimation');
                }, 500);


                this.hasEntries = this.shoppingCart.length > 0;
            }
        },
        methods: {
            handleStickyCart: function(){
                const scrollDistance = $(window).scrollTop();
                if (scrollDistance >= this.cartOriginalTop) {
                    $(this.$refs.cartElement).addClass('fixed');
                } else {
                    $(this.$refs.cartElement).removeClass('fixed');
                }
            },
            increaseCount: function(entry){
                entry.count++;
            },
            decreaseCount: function(entry){
                entry.count--;


                if (entry.count <= 0){
                    this.shoppingCart.splice(this.shoppingCart.indexOf(entry), 1);
                }
            },
            removeRecipeFromCart(recipe){
                console.log('do it');
                console.log(recipe);
                this.shoppingCart.splice(this.shoppingCart.indexOf(recipe));
            }
        },
        data () {
            return {
                scrolled: false,
                cartOriginalTop: 0,
                hasEntries: true
            };
        },
        computed: {
            shoppingCartCount: function () {
                let totalCount = 0;
                for (let i = 0; i < this.shoppingCart.length; i++){
                    totalCount += this.shoppingCart[i].count;
                }
                return totalCount;
            },
        },
        mounted() {
            this.cartOriginalTop = this.$refs.cartElement.offsetTop;
        },
        beforeMount () {
            window.addEventListener('scroll', this.handleStickyCart);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleStickyCart);
        }
    }
</script>