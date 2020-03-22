<template>
    <div>
        <Headline :text="headline" />

        <Progressbar
            ref="topProgress"
            color="#f8f9fa"
        />
        <div
            id="main-content"
        >
            <div
                v-if="loaded"
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

                <button
                    id="overviewCollapseButton"
                    :class="{ overviewCollapsed: overviewCollapsed}"
                    @click="collapseOverview()"
                >
                    <span class="fa fa-info-circle"></span>
                </button>

                <div
                    id="planning"
                    class="col-sm-4 col-lg-4 col-12"
                    :class="{ planningCollapsed: planningCollapsed}"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                >
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

                    <PlanningSidebar
                        :planning-data="planningData"
                        :period="currentPeriod"
                        :cost-center-data="costCenterData"
                        @createNewPlanning="createNewPlanning"
                        @deletePlanning="deletePlanning"
                        @connectPlanning="connectPlanning"
                        @save="savePlanning"
                    />
                </div>

                <div
                    id="accounting"
                    class="col-sm-8 col-lg-5"
                    :style="{
                        'max-height': accountingContainerHeight + 'px'
                    }"
                    @click="collapsePlanning(true)"
                    @focus="collapsePlanning(true)"
                >
                    <AccountingSidebar
                        :accounting-data="accountingData"
                        :period="currentPeriod"
                        :create-connection-data="createConnectionData"
                        @createNewAccounting="createNewAccounting"
                        @updateAccounting="updateAccounting"
                        @doAccountingPlanningConnection="doAccountingPlanningConnection"
                        @deleteConnection="deleteConnection"
                        @updateConnectedPlanning="updateConnectedPlanning"
                    />
                </div>

                <div
                    id="overview"
                    class="col-sm-8 col-lg-3"
                    :class="{ overviewCollapsed: overviewCollapsed}"
                >
                    <button
                        id="overviewCloseButton"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                        class="close"
                        :class="{ overviewClosed: !overviewCollapsed}"
                        @click="collapseOverview()"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                    <Overview
                        :planning-items="planningData"
                        :accounting-items="accountingData"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import moment from "moment";
import PlanningSidebar from "./PlanningSidebar";
import AccountingSidebar from "./AccountingSidebar";
import Overview from "./Overview";

export default {
    components: {
        PlanningSidebar,
        AccountingSidebar,
        Overview
    },
    props: {
        periodId: {
            type: Number,
            required: true,
            default: 1
        }
    },
    data: function(){
        return {
            currentPeriod: null,
            headline: "",
            year: 2019,
            month: 10,
            loaded: false,
            accountingContainerHeight: 0,
            planningCollapsed: true,
            overviewCollapsed: true,
            createConnectionData: {
                enabled: false,
                planningId: 0,
                accountingId: 0,
                planningTotalAmount: 0,
                accountingTotalAmount: 0,
                desiredAmount: 0,
                accountingData: null,
                planningData: null
            },
            costCenterData: [],
            accountingData: [
                {
                    id: 1,
                    title: "Westdeutsche Lotterie GmbH & Co. OHG westlotto.de",
                    totalAmount: -100,
                    remainingAmount: 0,
                    date: moment("2019-10-3").toDate(),
                    display: true,
                    isNew: false,
                    editMode: false,
                    connectedPlanning: [
                        {
                            id: 10,
                            totalAmount: -100,
                            costCenter: {
                                id:  6,
                                title: "Lotto"
                            },
                            description: "Regeömäßiger Spielschein",
                            display: true,
                            editMode:  false
                        },
                    ],
                },
                {
                    id: 2,
                    title: "REWE SAGT DANKE. 43400225//Muenster-Centrum/DE",
                    totalAmount: -400.96,
                    remainingAmount: -100,
                    date: moment("2019-10-30").toDate(),
                    display: true,
                    isNew: false,
                    editMode: false,
                    connectedPlanning: [
                        {
                            id: 20,
                            totalAmount: -300.96,
                            costCenter: {
                                id:  7,
                                title: "Lebensmittel"
                            },
                            description: "",
                            display: true,
                            editMode:  false
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Stadt Münster Stadtkasse",
                    totalAmount: 3000,
                    remainingAmount: 0,
                    date: moment("2019-10-30").toDate(),
                    display: true,
                    isNew: false,
                    editMode: false,
                    connectedPlanning: [
                        {
                            id: 30,
                            totalAmount: 2000,
                            costCenter: {
                                id:  2,
                                title: "Gehalt"
                            },
                            description: "Uwe",
                            display: true,
                            editMode:  false
                        },
                        {
                            id: 31,
                            totalAmount: 1000,
                            costCenter: {
                                id:  8,
                                title: "Weihnachtsgeld"
                            },
                            description: "Diesmal etwas weniger",
                            display: true,
                            editMode:  false
                        }
                    ],
                },
                {
                    id: 4,
                    title: "Scheffer und Loederbusch//Muenster/DE",
                    totalAmount: -399.94,
                    remainingAmount: -299.94,
                    date: moment("2019-10-26").toDate(),
                    display: true,
                    isNew: false,
                    editMode: false,
                    connectedPlanning: [
                        {
                            id: 40,
                            totalAmount: -100,
                            costCenter:  {
                                id: 5,
                                title: "Elektronik"
                            },
                            description: "this is my descipriotn",
                            display: true,
                            editMode:  false
                        }
                    ],
                }
            ],
            planningData: [ ],
        };
    },
    mounted() {
        this.loadData();
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        async loadData () {
            this.$refs.topProgress.start();
            this.loaded = false;
            const periodsPromise = window.axios.get("/api/finance/period/" + this.periodId)
                .then(res => {
                    this.currentPeriod = res.data;
                    this.year = this.currentPeriod.year;
                    this.month = this.currentPeriod.month;

                    this.headline = this.currentPeriod.monthName + " " + this.year;
                });

            const planningsPromise = window.axios.get("/api/finance/plannings/forPeriod/" + this.periodId)
                .then(res => {
                    this.planningData = res.data;
                });

            const costCenterPromise = window.axios.get("/api/finance/costCenter")
                .then(res => {
                    this.costCenterData = res.data;
                });
            await periodsPromise;
            await planningsPromise;
            await costCenterPromise;

            this.$refs.topProgress.done();
            this.loaded = true;
            this.triggerResize();
        },
        savePlanning(updatedPlanning) {
            this.$refs.topProgress.start();

            window.axios.put("/api/finance/planning/" + updatedPlanning.id, updatedPlanning)
                .then(res => {
                    //refresh data from the backend
                    updatedPlanning = res.data;
                    this.$refs.topProgress.done();
                    this.setPlanningById(updatedPlanning.id, updatedPlanning);
                });
        },
        triggerResize () {
            //handle resize on initial loading
            this.$nextTick(() => this.handleResize());
        },

        removeFromArray(arrayList, id){
            let i=0;
            let newArrayList = [];

            for (i=0; i < arrayList.length; i++){
                if (arrayList[i].id !== id){
                    newArrayList.push(arrayList[i]);
                }
            }
            return newArrayList;
        },
        deletePlanning(id){
            this.planningData = this.removeFromArray(this.planningData, id);
        },
        getArrayElementById(id, array){
            let i = 0;
            for (i = 0; i < array.length; i++){
                if (array[i].id === id){
                    return array[i];
                }
            }
        },
        deleteConnection(accountId, connectedElementToRemove){
            let i = 0;
            for (i = 0; i < this.accountingData.length; i++){
                if (this.accountingData[i].id === accountId){
                    let elementToDelete = this.getArrayElementById(
                            connectedElementToRemove,
                            this.accountingData[i].connectedPlanning
                        ),
                        accountingElement = this.accountingData[i]
                    ;

                    accountingElement.connectedPlanning = this.removeFromArray(
                        accountingElement.connectedPlanning, elementToDelete.id
                    );
                    this.updateRemainingAmount(accountingElement);
                }
            }
        },

        handleResize() {
            let element = document.getElementById("accounting-container");
            let boundaries = element.getBoundingClientRect();

            this.accountingContainerHeight = window.innerHeight - (boundaries.top) ;
        },
        doAccountingPlanningConnection(planning, accounting, desiredAmount){
            let planningElement = planning;
            let accountingElement = accounting;
            let clonedPlanning = JSON.parse(JSON.stringify(planningElement));

            clonedPlanning.totalAmount = desiredAmount;
            accountingElement.connectedPlanning.push(clonedPlanning);
            this.updateRemainingAmount(accountingElement);

            let planningNegative  = planningElement.totalAmount < 0;
            planningElement.totalAmount = planningElement.totalAmount - desiredAmount;

            if (planningNegative && planningElement.totalAmount >= 0) {
                planningElement.totalAmount = 0;
            }else if (!planningNegative && planningElement.totalAmount <= 0){
                planningElement.totalAmount = 0;
            }
            this.deactivateConnectionMode();
        },
        deactivateConnectionMode(){
            this.createConnectionData.enabled = false;
            this.createConnectionData.planningId = 0;
            this.createConnectionData.accountingId = 0;
        },
        updateConnectedPlanning(updatedPlanningItem, accountingId){
            let accounting = this.getAccountingById(accountingId);
            let i=0;

            for (i=0; i < accounting.connectedPlanning.length;i++){
                if (accounting.connectedPlanning.id === updatedPlanningItem.id){
                    accounting.connectedPlanning = updatedPlanningItem;
                }
            }
            this.updateRemainingAmount(accounting);
            this.setAccountingById(accountingId, accounting);
        },
        updateRemainingAmount(accounting) {
            let i=0;
            let remainingAmount=accounting.totalAmount;
            if (accounting.connectedPlanning){
                for (i=0; i < accounting.connectedPlanning.length; i++){
                    remainingAmount = parseFloat(remainingAmount) - parseFloat(accounting.connectedPlanning[i].totalAmount);
                }
            }
            accounting.remainingAmount = remainingAmount;
        },
        updateAccounting(updatedAccounting) {
            let i=0;

            this.updateRemainingAmount(updatedAccounting);
            for(i=0; i < this.accountingData.length;i++){
                if (updatedAccounting.id === this.accountingData[i].id)  {
                    this.accountingData[i] = updatedAccounting;
                }
            }
        },
        deleteAccounting(accountingDataToDelete) {
            this.accountingData.splice(this.accountingData.findIndex(function(i){
                return i.id === accountingDataToDelete.id;
            }), 1);
        },
        getPlanningById(id){
            let i=0;
            for(i=0; i < this.planningData.length;i++){
                if (id === this.planningData[i].id)  {
                    return this.planningData[i];
                }
            }
        },
        setPlanningById(id, item){
            let i=0;
            for(i=0; i < this.planningData.length;i++){
                if (id === this.planningData[i].id)  {
                    this.planningData[i] = item;
                }
            }
        },
        getAccountingById(id){
            let i=0;
            for(i=0; i < this.accountingData.length;i++){
                if (id === this.accountingData[i].id)  {
                    return this.accountingData[i];
                }
            }
        },
        setAccountingById(id, item){
            let i=0;
            for(i=0; i < this.accountingData.length;i++){
                if (id === this.accountingData[i].id)  {
                    this.accountingData[i] = item;
                }
            }
        },

        createNewAccounting() {
            let newAccountingElement = {
                id: 100,
                title: "",
                totalAmount: 0,
                remainingAmount: 0,
                date: moment(this.year + "-" + this.month + "-1").toDate(),
                display: true,
                isNew: true,
                editMode: true,
                connectedPlanning: []
            };
            this.accountingData.push(newAccountingElement);
        },
        createNewPlanning(){
            let newPlanningElement = {
                id: 9999,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
                description: "",
                totalAmount: 0,
                date: moment(this.year + "-" + this.month + "-1").toDate(),
                display: true,
                editMode:  true,
                isNew: true,
            };
            this.planningData.push(newPlanningElement);
        },
        connectPlanning(id, enabled) {
            this.createConnectionData.enabled = enabled;
            this.createConnectionData.planningId = id;
            this.createConnectionData.planningData = this.getPlanningById(id);
        },
        collapsePlanning(collapse) {
            if (collapse !== undefined){
                this.planningCollapsed = collapse;
            }else{
                //toggle
                this.planningCollapsed = !this.planningCollapsed;
            }
        },
        collapseOverview(collapse) {
            if (collapse !== undefined){
                this.overviewCollapsed = collapse;
            }else{
                //toggle
                this.overviewCollapsed = !this.overviewCollapsed;
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
            padding: 0 20px 0 20px;
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
