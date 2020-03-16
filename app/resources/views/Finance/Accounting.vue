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
                    <div class="row">
                        <div class="col-8">
                            <h2 class="d-none d-md-block">
                                Planung
                            </h2>
                        </div>
                        <div class="col-12 col-md-4 text-left text-md-right">
                            <div
                                id="PlanningButtons"
                                class="mb-3"
                            >
                                <button
                                    class="btn btn-outline-dark"
                                    title="Neuen Planungs-Eintrag erstellen"
                                    @click="createNewPlanning"
                                >
                                    <i class="fa fa-plus-circle"></i>
                                    <span class="d-inline-block d-md-none">
                                        Neuer Eintrag
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>


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
                        v-for="(item) in orderedPlanning"
                        :key="item.id"
                    >
                        <PlanningElement
                            v-if="item.display"
                            :class="planningClass(item.id)"
                            :planning-item="item"
                            :click-enabled="planningClickEnabled(item.id)"
                            :edit-mode="item.editMode"
                            :year="year"
                            :month="month"
                            @connect="connectPlanning(item.id, true)"
                            @delete="deletePlanning"
                            @close="connectPlanning(item.id, false)"
                            @edit="editPlanning(item.id, true)"
                            @cancel="editPlanning(item.id, false)"
                            @save="saveEditPlanning"
                        />
                    </div>
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
                    <div class="row">
                        <div class="col-8">
                            <h2 class="d-none d-md-block">
                                Umsätze
                            </h2>
                        </div>
                        <div class="col-12 col-md-4 text-left text-md-right">
                            <div
                                id="accountingButtons"
                                class="mb-3"
                            >
                                <button
                                    class="btn btn-outline-dark"
                                    title="Neuen Umsatz-Eintrag erstellen"
                                    @click="createNewAccounting"
                                >
                                    <i class="fa fa-plus-circle"></i>
                                    <span class="d-inline-block d-md-none">
                                        Neuer Eintrag
                                    </span>
                                </button>

                                <button
                                    class="btn btn-outline-dark"
                                    title="csv einlesen"
                                >
                                    <i class="fa fa-arrow-circle-up"></i>
                                    <span class="d-inline-block d-md-none">
                                        Datei hochladen
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        id="accountingSearch"
                        class="mb-3"
                    >
                        <Search @searched="accountingSearched" />
                    </div>

                    <div
                        v-for="(item) in sortedAccounting"
                        :key="item.id"
                    >
                        <AccountingElement
                            v-if="item.display"
                            :accounting-data="item"
                            :show-connect-target="accountingConnectable(item.id)"
                            :class="accountingClass(item.id)"
                            :year="year"
                            :month="month"
                            @updateData="updateAccounting"
                            @deleteAccounting="deleteAccounting"
                            @doConnection="doShowConnectionModal"
                            @deleteConnection="deleteConnection"
                            @updateConnectedPlanning="updateConnectedPlanning"
                        />
                    </div>
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

                <div v-if="showConnectionModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div
                                    class="modal-dialog"
                                    role="document"
                                >
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">
                                                Zuordnen
                                            </h5>
                                            <button
                                                type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                @click="closeModal"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                >&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p><strong>{{ connectAccountingData.title }}</strong> mit Kostenstelle <strong>{{ connectPlanningData.title }}</strong> verknüpfen.</p>
                                            <div class="form-group row">
                                                <label
                                                    for="desiredAmount"
                                                    class="col-2 col-form-label"
                                                >Betrag</label>
                                                <div class="col-6">
                                                    <input
                                                        id="desiredAmount"
                                                        v-model="connectDesiredAmount"
                                                        type="text"
                                                        class="form-control"
                                                    >
                                                </div>
                                                <div class="col-4">
                                                    <button
                                                        v-if="remainingAmountAfterConnection !== 0"
                                                        class="btn btn-secondary"
                                                        @click="useFullAmountForConnection"
                                                    >
                                                        <span class="fa fa-hand-holding-usd"></span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div v-if="remainingAmountAfterConnection !== 0">
                                                <div>
                                                    Es bleibt dann ein Restbetrag von {{ remainingAmountAfterConnection }} €
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                @click="closeModal"
                                            >
                                                <i class="fas fa-ban"></i>
                                                Abbrechen
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                @click="doAccountingPlanningConnection"
                                            >
                                                <i class="fas fa-link"></i>
                                                Zuordnen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import moment from "moment";
import Search from "../../js/components/tools/Search";
import PlanningElement from "../../js/components/Finance/PlanningElement";
import AccountingElement from "../../js/components/Finance/AccountingElement";
import Overview from "../../js/components/Finance/Overview";

export default {
    components: {
        PlanningElement,
        AccountingElement,
        Search,
        Overview
    },
    data: function(){
        return {
            headline: "Oktober 2019",
            year: 2019,
            month: 10,
            accountingContainerHeight: 0,
            planningCollapsed: true,
            overviewCollapsed: true,
            connectPlanningMode: false,
            connectPlanningId: 0,
            connectAccountingId: 0,
            connectPlanningTotalAmount: 0,
            connectAccountingTotalAmount: 0,
            connectDesiredAmount: 0,
            connectAccountingData: {},
            connectPlanningData: {},
            showConnectionModal: false,
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
            planningData: [
                {
                    id: 1,
                    costCenter: {
                        id: 1,
                        title: "Einkaufen"
                    },
                    description: "Gesamter Monat",
                    totalAmount: -100,
                    date: moment("2019-10-3").toDate(),
                    display: true,
                    editMode:  false,
                    isNew:  false
                },
                {
                    id: 2,
                    costCenter: {
                        id: 5,
                        title: "Elektronik"
                    },
                    description: "Rasierer Amazon",
                    totalAmount: -200,
                    date: moment("2019-10-4").toDate(),
                    display: true,
                    editMode:  false,
                    isNew:  false
                },
                {
                    id: 3,
                    costCenter: {
                        id: 5,
                        title: "Elektronik"
                    },
                    description: "PC Festplatte",
                    totalAmount: -200,
                    date: moment("2019-10-6").toDate(),
                    display: true,
                    editMode:  false,
                    isNew:  false
                },
                {
                    id: 4,
                    costCenter: {
                        id: 3,
                        title: "Sparbuch"
                    },
                    description: "Urlaub",
                    totalAmount: -300,
                    date: moment("2019-10-6").toDate(),
                    display: true,
                    editMode:  false,
                    isNew:  false,
                }
            ]
        };
    },
    computed: {
        remainingAmountAfterConnection: function () {
            let sum = parseFloat(this.connectAccountingData.remainingAmount) - parseFloat(this.connectDesiredAmount);
            return parseFloat(sum).toFixed(2);
        },
        orderedPlanning: function() {
            return _.orderBy(this.planningData, ["isNew", "date"], ["desc", "asc"]);
        },
        sortedAccounting: function() {
            return _.orderBy(this.accountingData, ["isNew", "date"], ["desc", "desc"]);
        }
    },
    mounted() {
        this.$nextTick(() => this.handleResize());

    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
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
        planningClickEnabled(id) {
            return !(this.connectPlanningMode && this.connectPlanningId !== id);
        },
        handleResize() {
            let element = document.getElementById("accounting-container");
            let boundaries = element.getBoundingClientRect();

            this.accountingContainerHeight = window.innerHeight - (boundaries.top) ;
        },
        doShowConnectionModal(accountId){
            let acounntingData = this.getAccountingById(accountId);
            let planningData = this.getPlanningById(this.connectPlanningId);

            this.connectAccountingData = acounntingData;
            this.connectPlanningData = planningData;

            this.showConnectionModal = true;
            this.connectAccountingId = accountId;
            this.connectAccountingTotalAmount = acounntingData.remainingAmount;
            this.connectPlanningTotalAmount = planningData.totalAmount;

            //make sure the desired amount for the connection is not greater than the remaining amount
            //of the accounting element
            if (this.connectAccountingData.remainingAmount < 0){
                if (this.connectAccountingData.remainingAmount - this.connectPlanningTotalAmount < 0) {
                    this.connectDesiredAmount = this.connectPlanningTotalAmount;
                }else{
                    this.connectDesiredAmount = this.connectAccountingData.remainingAmount;
                }
            }

            if (this.connectAccountingData.remainingAmount > 0){
                if (this.connectAccountingData.remainingAmount - this.connectPlanningTotalAmount > 0) {
                    this.connectDesiredAmount = this.connectPlanningTotalAmount;
                }else{
                    this.connectDesiredAmount = this.connectAccountingData.remainingAmount;
                }
            }

        },
        useFullAmountForConnection() {
            this.connectDesiredAmount = this.connectAccountingData.remainingAmount;
        },
        doAccountingPlanningConnection(){
            let planningElement = this.getPlanningById(this.connectPlanningId);
            let accountingElement = this.getAccountingById(this.connectAccountingId);
            let clonedPlanning = JSON.parse(JSON.stringify(planningElement));

            clonedPlanning.totalAmount = this.connectDesiredAmount;
            accountingElement.connectedPlanning.push(clonedPlanning);
            this.updateRemainingAmount(accountingElement);

            let planningNegative  = planningElement.totalAmount < 0;
            planningElement.totalAmount = planningElement.totalAmount - this.connectDesiredAmount;

            if (planningNegative && planningElement.totalAmount >= 0) {
                this.deletePlanning(this.connectPlanningId);
            }else if (!planningNegative && planningElement.totalAmount <= 0){
                this.deletePlanning(this.connectPlanningId);
            }

            this.closeModal();
            this.deactivateConnectionMode();
        },
        closeModal() {
            this.showConnectionModal = false;
        },
        deactivateConnectionMode(){
            this.connectPlanningMode = false;
            this.connectPlanningId = 0;
            this.connectAccountingId = 0;
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
        accountingConnectable(id) {
            if (this.connectPlanningMode){
                // noinspection EqualityComparisonWithCoercionJS
                return !this.getAccountingById(id).remainingAmount == 0.0;
            }
            return false;
        },
        accountingClass(id) {
            if (this.connectPlanningMode){
                if (this.getAccountingById(id).remainingAmount === 0){
                    return {"deactivated": true};
                }else{
                    return {"activated": true};
                }
            }
        },
        planningClass(id) {
            if (this.connectPlanningMode && this.connectPlanningId !== id){
                return { "deactivated": true };
            }else {
                return { "activated": true };
            }
        },
        updateYear(newYear) {
            this.year = newYear;
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
                id: 100,
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
        editPlanning(id, enabled) {
            this.getPlanningById(id).editMode = enabled;
        },
        saveEditPlanning(newPlanningItem){
            newPlanningItem.editMode = false;
            newPlanningItem.isNew = false;
            this.setPlanningById(newPlanningItem.id, newPlanningItem);
        },
        connectPlanning(id, enabled) {
            this.connectPlanningId = id;
            this.connectPlanningMode = enabled;
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
                    let planningItem = this.planningData[i];
                    let costCenter = planningItem.costCenter;
                    let display = (costCenter.title.toLowerCase().search(query.toLowerCase()) > -1);
                    if (!display){
                        display = (planningItem.description.toLowerCase().search(query.toLowerCase()) > -1);
                    }
                    if (!display) {
                        display = (planningItem.date.toLowerCase().search(query.toLowerCase()) > -1);
                    }
                    planningItem.display = display;
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

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
</style>
