<template>
    <div>
        <Headline text="Finanzen verwalten" />
        <Progressbar
            ref="topProgress"
            color="#f8f9fa"
        />
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
                class="row justify-content-center"
            >
                <div
                    v-if="periods.length"
                    class="col-3 mt-4 text-center"
                >
                    <div class="list-group">
                        <a
                            v-for="period in periods"
                            :key="period.id"
                            class="list-group-item list-group-item-action"
                            href="#"
                        >
                            <span
                                v-if="period.completed"
                                class="fas fa-lock"
                            ></span>
                            {{ period.monthName }}
                        </a>

                        <router-link
                            to="/finance/accounting"
                            class="list-group-item list-group-item active"
                        >
                            <span class="fa fa-plus-circle"></span>
                            April anlegen
                        </router-link>
                    </div>
                </div>
                <div
                    v-else-if="loaded"
                    class="col-3 mt-4 text-center"
                >
                    <div class="alert alert-info" role="alert">
                        Für dieses Jahr liegen keine Daten vor
                    </div>

                    <div class="list-group">
                        <router-link
                            to="/finance/accounting"
                            class="list-group-item list-group-item active"
                        >
                            <span class="fa fa-plus-circle"></span>
                            April anlegen
                        </router-link>
                    </div>
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
    computed: {
        nextMonth () {
            let lastMonth, i;
            for (i = 0; i < this.periods.length; i++){
                let currentMonth = this.periods[i].month;
                if (currentMonth > lastMonth){
                    lastMonth = currentMonth;
                }
            }
            return lastMonth + 1;
        }
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
            this.$refs.topProgress.start();
            await window.axios.get("/api/finance/period?year=" + this.year)
                .then(res => {
                    this.periods = res.data;
                }).catch(err => {
                    this.periods = [];
                });
            this.$refs.topProgress.done();
            this.loaded = true;
        }
    },
};
</script>
