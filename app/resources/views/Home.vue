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
                <!-- daytime depending welcome message -->
                <h1 v-if="isMorning()" class="text-uppercase mb-0">Guten Morgen!</h1>
                <h1 v-else-if="isAfternon()" class="text-uppercase mb-0">Guten Tag!</h1>
                <h1 v-else-if="isEvening()" class="text-uppercase mb-0">Guten Abend!</h1>
                <hr class="star-dark">
                <!-- random greetings -->
                <h2 class="font-weight-light mb-0">{{ greetings[Math.floor(Math.random() * greetings.length)] }}</h2>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
       data (){
           return {
               userName: "Vanessa",
               greetings: [
                   "Einen großartigen Tag!",
                   "Viel Spaß beim Arbeiten und einen schönen Tag!",
                   "Genieße den Tag!"
               ],
           }
       },
        computed: {
            hours () {
                return new Date().getHours();
            }
        },
        methods: {
            isMorning () {
                return this.hours > 4 && this.hours < 11;
            },
            isAfternon () {
                return this.hours >= 11 && this.hours < 18;
            },
            isEvening () {
                return this.hours >= 18 || this.hours <= 4;
            }
        }
    }
</script>