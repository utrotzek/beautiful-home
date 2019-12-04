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
                                <button class="btn btn-outline-dark">
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
                        v-for="(item) in planningData"
                        :key="item.id"
                    >
                        <PlanningElement
                            v-if="item.display"
                            :class="planningClass(item.id)"
                            :planning-item="item"
                            :click-enabled="planningClickEnabled(item.id)"
                            :edit-mode="item.editMode"
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
                                <button class="btn btn-outline-dark">
                                    <i class="fa fa-plus-circle"></i>
                                    <span class="d-inline-block d-md-none">
                                        Neuer Eintrag
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
                        v-for="(item) in accountingData"
                        :key="item.id"
                    >
                        <AccountingElement
                            v-if="item.display"
                            :accounting-data="item"
                            :show-connect-target="accountingConnectable(item.id)"
                            :class="accountingClass(item.id)"
                            @updateData="updateAccounting"
                            @doConnection="doShowConnectionModal"
                            @deleteConnection="deleteConnection"
                        />
                    </div>
                </div>

                <div class="col-lg-3">
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
            connectPlanningMode: false,
            connectPlanningId: 0,
            connectAccountingId: 0,
            connectPlanningTotalAmoint: 0,
            connectAccountingTotalAmoint: 0,
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
                    date: "12.10.2019",
                    display: true,
                    connectedPlanning: [
                        {
                            id: 10,
                            totalAmount: -100,
                            costCenter: {
                                id:  6,
                                title: "Lotto"
                            },
                            description: "Regeömäßiger Spielschein",
                        },
                    ],
                },
                {
                    id: 2,
                    title: "REWE SAGT DANKE. 43400225//Muenster-Centrum/DE",
                    totalAmount: -400.96,
                    remainingAmount: -100,
                    date: "30.10.2019",
                    display: true,
                    connectedPlanning: [
                        {
                            id: 20,
                            totalAmount: -300.96,
                            costCenter: {
                                id:  7,
                                title: "Lebensmittel"
                            },
                            description: "",
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Stadt Münster Stadtkasse",
                    totalAmount: 3000,
                    remainingAmount: 0,
                    date: "30.10.2019",
                    display: true,
                    connectedPlanning: [
                        {
                            id: 30,
                            totalAmount: 2000,
                            costCenter: {
                                id:  2,
                                title: "Gehalt"
                            },
                            description: "Uwe",
                        },
                        {
                            id: 31,
                            totalAmount: 1000,
                            costCenter: {
                                id:  8,
                                title: "Weihnachtsgeld"
                            },
                            description: "Diesmal etwas weniger",
                        }
                    ],
                },
                {
                    id: 4,
                    title: "Scheffer und Loederbusch//Muenster/DE",
                    totalAmount: -399.94,
                    remainingAmount: -299.94,
                    date: "26.10.2019",
                    display: true,
                    connectedPlanning: [
                        {
                            id: 40,
                            totalAmount: -100,
                            costCenter:  {
                                id: 5,
                                title: "Elektronik"
                            },
                            description: "this is my descipriotn",
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
                    date: "25.10.2019",
                    display: true,
                    editMode:  false
                },
                {
                    id: 2,
                    costCenter: {
                        id: 5,
                        title: "Elektronik"
                    },
                    description: "Rasierer Amazon",
                    totalAmount: -200,
                    date: "25.10.2019",
                    display: true,
                    editMode:  false
                },
                {
                    id: 3,
                    costCenter: {
                        id: 5,
                        title: "Elektronik"
                    },
                    description: "PC Festplatte",
                    totalAmount: -200,
                    date: "25.10.2019",
                    display: true,
                    editMode:  false
                },
                {
                    id: 4,
                    costCenter: {
                        id: 3,
                        title: "Sparbuch"
                    },
                    description: "Urlaub",
                    totalAmount: -300,
                    date: "25.10.2019",
                    display: true,
                    editMode:  false
                }
            ]
        };
    },
    computed: {
        remainingAmountAfterConnection: function () {
            let sum = this.connectAccountingData.remainingAmount - this.connectDesiredAmount;

            if (sum !== 0) {
                return parseFloat(sum).toFixed(2);
            }
            return 0;
        }
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

                    accountingElement.remainingAmount = accountingElement.remainingAmount + elementToDelete.totalAmount;
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
            this.connectAccountingTotalAmoint = acounntingData.remainingAmount;
            this.connectPlanningTotalAmoint = planningData.totalAmount;

            //make sure the desired amount for the connection is not greater than the remaining amount
            //of the accounting element
            if (this.connectAccountingData.remainingAmount < 0){
                if (this.connectAccountingData.remainingAmount - this.connectPlanningTotalAmoint < 0) {
                    this.connectDesiredAmount = this.connectPlanningTotalAmoint;
                }else{
                    this.connectDesiredAmount = this.connectAccountingData.remainingAmount;
                }
            }

            if (this.connectAccountingData.remainingAmount > 0){
                if (this.connectAccountingData.remainingAmount - this.connectPlanningTotalAmoint > 0) {
                    this.connectDesiredAmount = this.connectPlanningTotalAmoint;
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
            let remainingAmmount = accountingElement.totalAmount;
            let i = 0;

            clonedPlanning.totalAmount = this.connectDesiredAmount;
            accountingElement.connectedPlanning.push(clonedPlanning);

            for (i  = 0; i < accountingElement.connectedPlanning.length; i++){
                remainingAmmount = remainingAmmount - accountingElement.connectedPlanning[i].totalAmount;
            }
            accountingElement.remainingAmount = remainingAmmount;

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
        updateAccounting(updatedAccounting) {
            let i=0;
            for(i=0; i < this.accountingData.length;i++){
                if (updatedAccounting.id === this.accountingData[i].id)  {
                    this.accountingData[i] = updatedAccounting;
                }
            }
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
        editPlanning(id, enabled) {
            this.getPlanningById(id).editMode = enabled;
        },
        saveEditPlanning(newPlanningItem){
            newPlanningItem.editMode = false;
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
