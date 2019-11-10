<template>
    <div>
        <Headline :text="headline" />
        <div id="main-content">
            <div
                id="accounting-container"
                class="row"
            >
                <button
                    id="planningCollapseButton"
                    :class="{ planningCollapsed: planningCollapsed}"
                    @click="collapsePlanning()"
                >
                    <span class="fa fa-chevron-left"></span>
                </button>
                <div
                    id="planning"
                    class="col-sm-4 col-12"
                    :class="{ planningCollapsed: planningCollapsed}"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                >
                    <h2 class="d-none d-md-block">
                        Planung
                    </h2>
                    <button
                        id="planningCloseButton"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                        class="close"
                        :class="{ planningClosed: !planningCollapsed}"
                        @click="collapsePlanning()"
                    >
                        <span aria-hidden="true">×</span>
                    </button>

                    <div
                        id="planningSearch"
                        class="mb-3"
                    >
                        <Search @searched="planningSearched" />
                    </div>

                    <div
                        v-for="(item, key) in planningData"
                        :key="item.id"
                    >
                        <PlanningElement
                            v-if="item.display"
                            :id="item.id"
                            :total-amount="item.totalAmount"
                            :description="item.description"
                            :title="item.title"
                            :date="item.date"
                        />
                    </div>
                </div>
                <div
                    id="accounting"
                    class="col-sm-8"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                    @click="collapsePlanning(true)"
                    @focus="collapsePlanning(true)"
                >
                    <h2 class="d-none d-md-block">
                        Umsätze
                    </h2>
                    <div
                        id="accountingSearch"
                        class="mb-3"
                    >
                        <Search @searched="accountingSearched" />
                    </div>

                    <div
                        v-for="(item) in accountingData"
                        :key="item.id"
                    >
                        <AccountingElement
                            v-if="item.display"
                            :accounting-date="item.date"
                            :accounting-title="item.title"
                            :total-amount="item.totalAmount"
                            :remaining-amount="item.remainingAmount"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Search from "../../js/components/tools/Search";
import PlanningElement from "../../js/components/Finance/PlanningElement";
import AccountingElement from "../../js/components/Finance/AccountingElement";

export default {
    components: {
        PlanningElement,
        AccountingElement,
        Search
    },
    data: function(){
        return {
            headline: "Oktober 2019",
            year: 2019,
            month: 10,
            accountingContainerHeight: 0,
            planningCollapsed: true,

            accountingData: [
                {
                    id: 1,
                    title: "Westdeutsche Lotterie GmbH & Co. OHG westlotto.de",
                    totalAmount: -100,
                    date: "12.10.2019",
                    display: true
                },
                {
                    id: 2,
                    title: "REWE SAGT DANKE. 43400225//Muenster-Centrum/DE",
                    totalAmount: -400.96,
                    date: "30.10.2019",
                    display: true
                },
                {
                    id: 3,
                    title: "Stadt Münster Stadtkasse",
                    totalAmount: 3000,
                    date: "30.10.2019",
                    display: true
                },
                {
                    id: 4,
                    title: "Scheffer und Loederbusch//Muenster/DE",
                    totalAmount: -399.94,
                    date: "26.10.2019",
                    display: true
                }
            ],
            planningData: [
                {
                    id: 1,
                    title: "Einkaufen",
                    description: "Gesamter Monat",
                    totalAmount: -100,
                    date: "25.10.2019",
                    display: true
                },
                {
                    id: 2,
                    title: "Elektronik",
                    description: "Rasierer Amazon",
                    totalAmount: -200,
                    date: "25.10.2019",
                    display: true
                },
                {
                    id: 3,
                    title: "Elektronik",
                    description: "PC Festplatte",
                    totalAmount: -200,
                    date: "25.10.2019",
                    display: true
                },
                {
                    id: 4,
                    title: "Sparbuch",
                    description: "Urlaub",
                    totalAmount: -300,
                    date: "25.10.2019",
                    display: true
                }
            ]
        };
    },
    computed: {
    },
    mounted() {
        this.year = new Date().getFullYear();
        this.$nextTick(() => this.handleResize());

    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            let element = document.getElementById("accounting-container");
            let boundaries = element.getBoundingClientRect();

            this.accountingContainerHeight = window.innerHeight - (boundaries.top) ;
        },
        updateYear(newYear) {
            this.year = newYear;
        },
        accountingSearched(query) {
            if (query.length === 0){
                let i, n = this.accountingData.length;
                for (i = 0; i < n; i++){
                    this.accountingData[i].display = true;
                }
            }else{
                let i, n = this.accountingData.length -1;
                for (i = 0; i <= n; i++){
                    let currentItem = this.accountingData[i];
                    let display = (currentItem.title.toLowerCase().search(query.toLowerCase()) > -1);

                    if (!display) {
                        display = (currentItem.date.toLowerCase().search(query.toLowerCase()) > -1);
                    }
                    currentItem.display = display;
                }
            }
        },
        planningSearched(query) {
            if (query.length === 0){
                let i, n = this.planningData.length;
                for (i = 0; i < n; i++){
                    this.planningData[i].display = true;
                }
            }else{
                let i, n = this.planningData.length -1;
                for (i = 0; i <= n; i++){
                    let currentItem = this.planningData[i];
                    let display = (currentItem.title.toLowerCase().search(query.toLowerCase()) > -1);
                    if (!display){
                        display = (currentItem.description.toLowerCase().search(query.toLowerCase()) > -1);
                    }
                    if (!display) {
                        display = (currentItem.date.toLowerCase().search(query.toLowerCase()) > -1);
                    }
                    currentItem.display = display;
                }
            }
        },
        collapsePlanning(collapse) {
            if (collapse !== undefined){
                this.planningCollapsed = collapse;
            }else{
                //toggle
                this.planningCollapsed = !this.planningCollapsed;
            }
        }
    }
};
</script>

<style scoped>
    #planning {
        padding: 40px 10px 40px 10px;
    }

    @media (min-width: 768px) {
        #planning {
            padding: 0 10px 0 10px;
        }
    }

    @media (min-width: 1200px) {
        #accounting {
            width: 70%;
        }
    }

    #accounting {
        padding: 0 48px  0 20px;
    }
</style>
