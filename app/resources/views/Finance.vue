<template>
    <div>
        <Headline text="Finanzen verwalten" />
        <div class="main-content">
            <div class="row text-center">
                <div class="col">
                    <year
                        :year="year"
                        @update-year="updateYear"
                    />
                </div>
            </div>
            <div class="row text-center mt-4">
                <div class="col-md-4 col-12 text-center">
                    <a
                        class="btn btn-link"
                        href="#"
                    > Januar</a>
                </div>
                <div class="col-md-4 col-12 text-center">
                    <a
                        class="btn btn-link"
                        href="#"
                    > Februar</a>
                </div>
                <div class="col-md-4 col-12 text-center">
                    <a
                        class="btn btn-link"
                        href="#"
                    > März</a>
                </div>
            </div>
            <div class="row text-center mt-md-5">
                <div class="col-md-4 col-12 text-center">
                    <router-link
                        to="/finance/accounting"
                        tag="button"
                        class="btn btn-primary"
                    >
                        <span class="fa fa-plus-circle"></span>
                        April anlegen
                    </router-link>
                </div>
                <div class="col-4 text-center">
                </div>
                <div class="col-4 text-center">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import YearComponent from "../js/components/Finance/Year";

// eslint-disable-next-line
let currentYear = 2020; 
    
export default {
    components: {
        year: YearComponent
    },
    data: function(){
        return {
            year: this.currentYear
        };
    },
    mounted() {
        this.year = new Date().getFullYear();
    },
    methods: {
        updateYear(newYear) {
            this.year = newYear;
        }
    },
};
</script>