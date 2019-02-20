<template>
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
</template>

<script>
    export default {
        methods: {
            displayScrollToTop: function(event){
                var scrollDistance = $(window).scrollTop();
                console.log(scrollDistance);
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
            window.addEventListener('scroll', this.displayScrollToTop);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.displayScrollToTop);
        }
    }
</script>