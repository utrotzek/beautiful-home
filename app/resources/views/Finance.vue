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
            <div
                v-if="periods.length"
                class="row text-center mt-4">

                <div
                    v-for="period in periods"
                    :key="period.id"
                    class="col-md-4 col-12 text-center"
                >
                    <span v-if="period.completed" class="fas fa-lock"></span>

                    <a
                        class="btn btn-link"
                        href="#"
                    >  {{ period.monthName }}</a>
                </div>
            </div>
            <div v-else-if="loaded" class="row text-center mt-4">
                <div class="col">
                    Für dieses Jahr liegen keine Daten vor
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import YearComponent from "../js/components/Finance/Year";

export default {
    components: {
        year: YearComponent
    },
    data: function(){
        return {
            year: new Date().getFullYear(),
            periods: [],
            loaded: false
        };
    },
    watch: {
        year: function (){
            this.read();
        }
    },
    mounted() {
        this.read();
    },
    methods: {
        updateYear(newYear) {
            this.year = newYear;
        },

        async read() {
            await window.axios.get("/api/finance/period?year=" + this.year)
                .then(res => {
                    this.periods = res.data;
                }).catch(err => {
                    this.periods = [];
                });
            this.loaded = true;
        }
    },
};
</script>
