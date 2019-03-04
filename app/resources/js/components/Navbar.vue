<template>
    <nav id="navbar" class="navbar navbar-expand navbar-dark bg-dark static-top d-print-none">
        <router-link class="navbar-brand mr-1" to="/">Beautiful home</router-link>
        <button class="sidebar-toggle-button btn btn-link btn-sm text-white order-1 order-sm-0" v-on:click="sidebarToggle">
            <i class="fas fa-bars"></i>
        </button>
    </nav>
</template>
<script>
    export default {
        methods: {
            sidebarToggle: function (event){
                this.$emit('sidebarToggle');
            }
        }
    }
</script>