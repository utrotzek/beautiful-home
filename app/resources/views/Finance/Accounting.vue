<template>
    <div>
        <Headline :text="headline" />
        <div id="main-content">
            <div
                id="accounting-container"
                class="row"
            >
                <div
                    id="planning"
                    class="col-md-4"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                >
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                    <PlanningElement />
                </div>
                <div
                    id="accounting"
                    class="col-md-8"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                >
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                    <AccountingElement />
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import PlanningElement from "../../js/components/Finance/PlanningElement";
import AccountingElement from "../../js/components/Finance/AccountingElement";

export default {
    components: {
        PlanningElement,
        AccountingElement
    },
    data: function(){
        return {
            headline: "Oktober 2019",
            year: 2019,
            month: 10,
            accountingContainerHeight: 0
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
        }
    }
};
</script>