<template>
    <ul dusk="sidebar" id="sidebar" class="sidebar navbar-nav d-print-none" :class="{toggled: isToggled}">
        <li class="nav-item">
            <router-link to="/recipe" class="nav-link">
                <i class="fas fa-fw fa-hamburger"></i>
                <span>Rezepte</span>
            </router-link>
            <router-link to="/shoppingList" class="nav-link">
                <i class="fas fa-fw fa-shopping-bag"></i>
                <span>Einkaufliste</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
        props: ['isToggled']
    }
</script>