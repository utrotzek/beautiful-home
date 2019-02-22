<template>
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
</template>

<script>
    export default {
        methods: {
            handleStickyCart: function(){
                const scrollDistance = $(window).scrollTop();
                if (scrollDistance > 300) {
                    $('.scroll-to-top').fadeIn();
                } else {
                    $('.scroll-to-top').fadeOut();
                }
            }
        },
        data () {
            return {
                scrolled: false
            };
        },
        beforeMount () {
            window.addEventListener('scroll', this.handleStickyCart);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleStickyCart);
        }
    }
</script>