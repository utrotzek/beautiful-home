<template>
    <div>
        <div id="cart" class="d-flex justify-content-end" >
            <a class="btn btn-light" data-toggle="modal" data-target="#exampleModal" href="#" >
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-info">{{ shoppingCart.length }}</span>
            </a>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Einkaufwagen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Here we go....
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
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
        }
    }
</script>