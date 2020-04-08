<template>
    <div>
        <Headline text="Finanzen verwalten" />
        <Progressbar
            ref="topProgress"
            color="#f8f9fa"
        />
        <div id="main-content">
            <div class="row justify-content-center">
                <div class="col-xs-8 col-md-3  mt-4 mb-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                :class="{active: view==='accounting'}"
                                href="#"
                                @click="showAccounting"
                            >Buchhaltung</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                :class="{active: view==='templates'}"
                                href="#"
                                @click="showTemplates"
                            >Vorlagen</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                v-if="view==='accounting'"
                id="accountingView"
            >
                <div class="row text-center">
                    <div class="col">
                        <year
                            :year="year"
                            @update-year="updateYear"
                        />
                    </div>
                </div>
                <!-- TODO make layout nicer -->
                <div
                    v-if="errorMessage"
                    class="text-center"
                >
                    <div
                        class="alert alert-danger"
                        role="alert"
                    >
                        {{ errorMessage }}
                    </div>
                </div>
                <div
                    v-if="loaded"
                    class="row justify-content-center"
                >
                    <div
                        v-if="periods.length"
                        class="col-xs-8 col-md-3 mt-4"
                    >
                        <div class="list-group">
                            <router-link
                                v-for="period in periods"
                                :key="period.id"
                                class="list-group-item list-group-item-action"
                                :to="{name: 'accounting', params: {periodId: period.id}}"
                            >
                                <span
                                    v-if="period.completed"
                                    class="fas fa-lock"
                                ></span>
                                {{ period.monthName }}
                            </router-link>

                            <a
                                v-if="nextMonth <= 12"
                                class="list-group-item list-group-item-action active"
                                href="#"
                                @click="createPeriod(nextMonth)"
                            >
                                <span class="fa fa-plus-circle"></span>
                                {{ nextMonthName }}
                            </a>
                        </div>
                    </div>
                    <div
                        v-else
                        class="col-3 mt-4 mt-4 pl-5"
                    >
                        <div
                            class="alert alert-info"
                            role="alert"
                        >
                            Für dieses Jahr liegen keine Daten vor
                        </div>

                        <div
                            v-if="nextMonth <= 12"
                            class="list-group"
                        >
                            <a
                                v-if="nextMonth <= 12"
                                class="list-group-item list-group-item-action active"
                                href="#"
                                @click="createPeriod(nextMonth)"
                            >
                                <span class="fa fa-plus-circle"></span>
                                {{ nextMonthName }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="view==='templates'"
                id="templateView"
            >
                <div
                    v-if="loaded"
                    class="row justify-content-center"
                >
                    <div class="col-xs-8 col-md-3  mt-4 mb-3">
                        <TemplateCrud

                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import YearComponent from "./Year";
import TemplateCrud from "./TemplateCrud";

export default {
    components: {
        TemplateCrud,
        year: YearComponent
    },
    data: function(){
        return {
            year: new Date().getFullYear(),
            allMonths: [],
            periods: [],
            loaded: false,
            errorMessage: "",
            view: "accounting"
        };
    },
    computed: {
        nextMonth () {
            let lastMonth = 0, i;
            for (i = 0; i < this.periods.length; i++){
                let currentMonth = this.periods[i].month;
                if (currentMonth > lastMonth){
                    lastMonth = currentMonth;
                }
            }
            return lastMonth + 1;
        },
        nextMonthName () {
            return this.allMonths[this.nextMonth];
        }
    },
    watch: {
        year: function (){
            this.loadData();
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        updateYear(newYear) {
            this.year = newYear;
        },
        async createPeriod(month) {
            this.errorMessage = "";
            this.$refs.topProgress.start();
            await window.axios.post("/api/finance/period", {month: month, year: this.year, completed: false})
                .then(res => {
                    this.$refs.topProgress.done();
                    this.$router.push({name: "accounting", params: {periodId: res.data.id}});
                }).catch(() => {
                    this.errorMessage = "Fehler beim speichern";
                    this.$refs.topProgress.done();
                });
        },
        async loadData() {
            this.$refs.topProgress.start();
            this.loaded = false;
            const periodPromise = window.axios.get("/api/finance/period?year=" + this.year)
                .then(res => {
                    this.periods = res.data;
                }).catch(() => {
                    this.periods = [];
                });

            const monthPromise = window.axios.get("/api/months")
                .then(res => {
                    this.allMonths = res.data;
                }).catch(() => {
                    this.allMonths = [];
                });

            await periodPromise;
            await monthPromise;
            this.$refs.topProgress.done();
            this.loaded = true;
        },
        showAccounting() {
            this.view = "accounting";
        },
        showTemplates() {
            this.view = "templates";
        }
    },
};
</script>
