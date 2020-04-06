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
                        @createCostCenter="updateCostCenters"
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
                        @updateAccounting="saveAccounting"
                        @doAccountingPlanningConnection="doAccountingPlanningConnection"
                        @deleteConnection="deleteConnection"
                        @updateConnectedPlanning="updateConnectedPlanning"
                        @deleteAccounting="deleteAccounting"
                        @loading="startProgressBar"
                        @loadingCompleted="stopProgressBar"
                        @dataImported="refreshData"
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
            progressBarCount: 0,
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
            accountingData: [],
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
            this.startProgressBar();
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

            const accountingsPromise = window.axios.get("/api/finance/accountings/forPeriod/" + this.periodId)
                .then(res => {
                    this.accountingData = res.data;
                });

            const costCenterPromise = this.fetchCostCenters();

            await periodsPromise;
            await accountingsPromise;
            await planningsPromise;
            await costCenterPromise;

            this.stopProgressBar();
            this.loaded = true;
            this.triggerResize();
        },
        async fetchCostCenters() {
            window.axios.get("/api/finance/costCenter")
                .then(res => {
                    this.costCenterData = res.data;
                });
        },
        refreshData() {
            this.loadData();
        },
        startProgressBar() {
            if (this.progressBarCount === 0){
                this.$refs.topProgress.start();
            }
            this.progressBarCount++;
        },
        stopProgressBar() {
            if (this.progressBarCount > 0){
                this.progressBarCount--;
                if (this.progressBarCount === 0){
                    this.$refs.topProgress.done();
                }
            }
        },
        updateCostCenters(){
            this.fetchCostCenters();
        },
        saveAccounting(accounting) {
            this.startProgressBar();

            //axios will convert the date to UTC (which is wrong) so we have to convert the date
            //to string before transferring
            accounting.date = moment(accounting.date).format("YYYY-MM-DD");

            if (accounting.isNew) {
                const tempId = accounting.id;

                window.axios.post("/api/finance/accounting", accounting)
                    .then(res => {
                        accounting = res.data;
                        this.stopProgressBar();
                        this.accountingData = this.removeFromArray(this.accountingData, tempId);
                        this.accountingData.push(accounting);
                        this.stopProgressBar();
                    });

            }else{
                window.axios.put("/api/finance/accounting/" + accounting.id, accounting)
                    .then(res => {
                        accounting.remainingAmount = res.data.remainingAmount;
                        accounting.connectedPlanning = res.data.connectedPlanning;
                        this.stopProgressBar();
                    });
            }
        },

        savePlanning(planning) {
            this.startProgressBar();

            //axios will convert the date to UTC (which is wrong) so we have to convert the date
            //to string before transferring
            planning.date = moment(planning.date).format("YYYY-MM-DD");

            if (planning.isNew) {
                const oldId = planning.id;
                window.axios.post("/api/finance/planning", planning)
                    .then(res => {
                        //refresh data from the backend
                        planning = res.data;
                        this.stopProgressBar();
                        this.planningData = this.removeFromArray(this.planningData, oldId);
                        this.planningData.push(planning);
                    });
            }else{
                window.axios.put("/api/finance/planning/" + planning.id, planning)
                    .then(() => {
                        this.stopProgressBar();
                    });
            }
        },
        deletePlanning(id){
            const planningToDelete = this.getPlanningById(id);
            if (planningToDelete.isNew){
                this.planningData = this.removeFromArray(this.planningData, planningToDelete.id);
            }else{
                this.startProgressBar();

                window.axios.delete("/api/finance/planning/" + planningToDelete.id)
                    .then(() => {
                        this.stopProgressBar();
                        this.planningData = this.removeFromArray(this.planningData, planningToDelete.id);
                    });
            }
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
        getArrayElementById(id, array){
            let i = 0;
            for (i = 0; i < array.length; i++){
                if (array[i].id === id){
                    return array[i];
                }
            }
        },
        deleteConnection(accountId, costCenterAccountingToRemove){
            this.startProgressBar();
            window.axios.delete("/api/finance/costCenterAccounting/" + costCenterAccountingToRemove.id)
                .then(() =>{
                    const accounting = this.getAccountingById(accountId);
                    this.saveAccounting(accounting);
                    this.stopProgressBar();
                })
            ;
        },

        handleResize() {
            let element = document.getElementById("accounting-container");
            let boundaries = element.getBoundingClientRect();

            this.accountingContainerHeight = window.innerHeight - (boundaries.top) ;
        },
        doAccountingPlanningConnection(planning, accounting, desiredAmount){
            let planningElement = planning;
            let accountingElement = accounting;

            const dataToStore = {
                accountingId: accountingElement.id,
                costCenterId: planningElement.costCenter.id,
                totalAmount: desiredAmount,
                description: planning.description
            };

            window.axios.post("/api/finance/costCenterAccounting", dataToStore)
                .then(res =>{
                    const costCenterAccounting = res.data;
                    accountingElement.connectedPlanning.push(costCenterAccounting);
                    this.saveAccounting(accountingElement);
                    planningElement = this.updatePlanningTotalAmount(planningElement, desiredAmount);
                    this.savePlanning(planningElement);
                    this.deactivateConnectionMode();
                })
            ;
        },
        updatePlanningTotalAmount(planningElement, desiredAmount){
            let planningNegative  = planningElement.totalAmount <= 0;
            planningElement.totalAmount = planningElement.totalAmount - desiredAmount;

            if (planningNegative && planningElement.totalAmount >= 0) {
                planningElement.totalAmount = 0;
            }else if (!planningNegative && planningElement.totalAmount <= 0){
                planningElement.totalAmount = 0;
            }
            return planningElement;
        },
        deactivateConnectionMode(){
            this.createConnectionData.enabled = false;
            this.createConnectionData.planningId = 0;
            this.createConnectionData.accountingId = 0;
        },
        updateConnectedPlanning(updatedCostCenterItem, accountingId){
            const accounting = this.getAccountingById(accountingId);
            const dataToStore = {
                accountingId: accountingId,
                costCenterId: updatedCostCenterItem.costCenter.id,
                totalAmount: updatedCostCenterItem.totalAmount,
                description: updatedCostCenterItem.description
            };

            window.axios.put("/api/finance/costCenterAccounting/" + updatedCostCenterItem.id, dataToStore)
                .then(() =>{
                    this.saveAccounting(accounting);
                })
            ;
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
        deleteAccounting(accountingDataToDelete) {
            if (!accountingDataToDelete.isNew){
                this.startProgressBar();
                window.axios.delete("/api/finance/accounting/" + accountingDataToDelete.id)
                    .then(() => {
                        this.removeItemFromArray(this.accountingData, accountingDataToDelete.id);
                        this.stopProgressBar();
                    });
            }else{
                this.removeItemFromArray(this.accountingData, accountingDataToDelete.id);
            }
        },
        removeItemFromArray(array, id){
            array.splice(array.findIndex(function(i){
                return i.id === id;
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
            if (!this.hasUnsavedNewAccountings()){
                let newAccountingElement = {
                    id: 9999999,
                    title: "",
                    totalAmount: "",
                    remainingAmount: -20,
                    date: moment(this.year + "-" + this.month + "-1").toDate(),
                    display: true,
                    isNew: true,
                    editMode: true,
                    connectedPlanning: [],
                    period: this.currentPeriod
                };
                this.accountingData.push(newAccountingElement);
            }
        },
        createNewPlanning(){
            if (!this.hasUnsavedNewPlannings()) {
                let newPlanningElement = {
                    id: this.getUniquePlanningId(),
                    costCenter: {
                        id: 99999,
                        title: "----------"
                    },
                    description: "",
                    totalAmount: "",
                    date: moment(this.year + "-" + this.month + "-1").toDate(),
                    display: true,
                    editMode:  true,
                    isNew: true,
                    period: this.currentPeriod
                };
                this.planningData.push(newPlanningElement);
            }
        },
        hasUnsavedNewPlannings() {
            let i = 0;
            for (i=0; i < this.planningData.length; i++){
                if (this.planningData[i].isNew){
                    return true;
                }
            }
            return false;
        },
        hasUnsavedNewAccountings() {
            let i = 0;
            for (i=0; i < this.accountingData.length; i++){
                if (this.accountingData[i].isNew){
                    return true;
                }
            }
            return false;
        },
        getUniquePlanningId() {
            let i = 0, maxId = 0;
            for (i=0; i < this.planningData.length; i++){
                if (this.planningData[i].id > maxId){
                    maxId = this.planningData[i].id;
                }
            }
            return maxId + 1;
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
