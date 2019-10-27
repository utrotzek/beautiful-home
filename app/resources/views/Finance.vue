<template>
    <div>
        <Headline text="Finanzen verwalten" />
        <div class="main-content">
            <div class="row text-center">
                <div class="col">
                    <year :year="year" @update-year="updateYear"/>
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
    }
};
</script>