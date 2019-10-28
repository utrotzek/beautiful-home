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
                    <button
                        id="planningCloseButton"
                        :class="{ planningClosed: !planningCollapsed}"
                        @click="collapsePlanning()"
                    >
                        <span class="fa fa-window-close"></span>
                    </button>

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
                    class="col-sm-8"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                    @click="collapsePlanning(true)"
                    @focus="collapsePlanning(true)"
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
            accountingContainerHeight: 0,
            planningCollapsed: true
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