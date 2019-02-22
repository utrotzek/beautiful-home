<template>
    <div>
        <div id="cart" class="d-flex justify-content-end" ref="cartElement" >
            <a class="btn btn-light" data-toggle="modal" data-target="#shoppingCartModal" href="#" >
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-info">{{ shoppingCart.length }}</span>
            </a>
        </div>
        <div class="modal fade" id="shoppingCartModal" tabindex="-1" role="dialog" aria-labelledby="shoppingCartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
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
                                <h5>Gerichte</h5>
                                <ul class="list-group">
                                    <li
                                        class="list-group-item"
                                        v-for="recipe in shoppingCart">

                                        <div class="row">
                                            <div class="col-md-3 col-sm-12">
                                                <div>
                                                    <span>2 Portionen</span>

                                                    <button class="btn btn-light d-inline-block">
                                                        <i class="fas fa-minus-circle"></i>
                                                    </button>
                                                    <button class="btn btn-light d-inline-block">
                                                        <i class="fas fa-plus-circle"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <SearchResultEntry :recipe="recipe" :enableButtons="false"></SearchResultEntry>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Einkaufsliste erstellen</button>
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
            }
        },
        data () {
            return {
                scrolled: false,
                cartOriginalTop: 0

            };
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