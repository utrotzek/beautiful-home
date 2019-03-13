<template>
    <div>
        <Headline text="Was möchtest Du tun?" />

        <div class="main-content">
            <div id="button-menu">
                <div class="row justify-content-md-center">
                    <div class="col-md-6 col-lg-4">
                        <router-link
                            to="/recipe/search"
                            tag="button"
                            class="btn btn-primary btn-block text-left"
                        >
                            <span class="fa fa-search"></span>
                            <span class="left-spacing">Rezepte suchen</span>
                        </router-link>
                        <router-link
                            to="/recipe/edit"
                            tag="button"
                            class="btn btn-default btn-block text-left mt-3"
                        >
                            <span class="fa fa-edit"></span>
                            <span class="left-spacing">Ein neues Rezept eingeben</span>
                        </router-link>
                        <router-link
                            to="/recipe/rate"
                            tag="button"
                            class="btn btn-default btn-block text-left mt-3"
                        >
                            <i class="fa fa-bell"></i>
                            <span class="badge badge-danger">{{ recipeRatingsCount }}</span>
                            <span class="left-spacing">Gerichte bewerten</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            recipeRatingsCount: 10
        };
    }
};
</script>