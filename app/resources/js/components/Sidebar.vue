<template>
    <ul class="sidebar navbar-nav">
        <li class="nav-item">
            <router-link to="/" class="nav-link" exact>
                <i class="fas fa-fw fa-home"></i>
                <span>Home</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/recipe" class="nav-link">
                <i class="fas fa-fw fa-hamburger"></i>
                <span>Rezepte</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
    export default {
    }
</script>