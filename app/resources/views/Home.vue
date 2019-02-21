<template>
    <div>
        <div class="row justify-content-center align-self-center text-center">
            <div class="col-12">
                <h1>Willkommen</h1>
            </div>
            <div class="col-12 profile-pic">
                <picture>
                    <source media="(max-width: 576px)" srcset="../images/profile_100x100.png">
                    <source media="(min-width: 800px)" srcset="../images/profile_256_256.png">
                    <img src="../images/profile_256_256.png" class="img-fluid"/>
                </picture>
            </div>
            <div class="col-12 description">
                <h1 class="text-uppercase mb-0">Hallo {{ userName }}</h1>
                <hr class="star-dark">
                <h2 class="font-weight-light mb-0">{{ greetings[Math.floor(Math.random() * greetings.length)] }}</h2>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
       data: function (){
           return {
               userName: "Vanessa",
               greetings: [
                   "Einen großartigen Tag!",
                   "Viel Spaß beim Arbeiten und einen schönen Tag!",
                   "Genieße den Tag!"
               ]
           }
       }
    }
</script>