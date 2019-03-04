<template>
    <div dusk="home-view">
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
                <h1 class="text-uppercase mb-0">{{ greeting }}</h1>
                <hr class="star-dark">
                <!-- random motivation -->
                <h2 class="font-weight-light mb-0">{{ motivationText }}</h2>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
       data (){
           return {
               userName: "Vanessa",
               motivation: [
                   "Einen großartigen Tag!",
                   "Viel Spaß beim Arbeiten und einen schönen Tag!",
                   "Genieße den Tag!"
               ],
           }
       },
        computed: {
            hours () {
                return new Date().getHours();
            },
            motivationText () {
                return this.motivation[Math.floor(Math.random() * this.motivation.length)]
            },
            greeting () {
                if (this.isMorning()){
                    return "Guten Morgen!"
                }else if (this.isAfternon()){
                    return "Guten Tag!"
                }else {
                    return "Guten Abend!"
                }
            }
        },
        methods: {
            isMorning () {
                return this.hours > 4 && this.hours < 11;
            },
            isAfternon () {
                return this.hours >= 11 && this.hours < 18;
            }
        }
    }
</script>