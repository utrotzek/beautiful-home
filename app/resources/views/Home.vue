<template>
    <div class="mb-0 text-center">
        <div class="profile-pic">
            <img src="../images/profile.png" class="img-fluid"/>
        </div>
        <div class="description">
            <h1 class="text-uppercase mb-0">Hallo {{ userName }}</h1>
            <hr class="star-dark">
            <h2 class="font-weight-light mb-0">Viel Spaß beim Arbeiten und einen schönen Tag</h2>
        </div>
    </div>
</template>
<script>
    export default {
       data: function (){
           return {
               userName: "Vanessa"
           }
       }
    }
</script>