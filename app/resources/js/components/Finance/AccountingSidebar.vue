<template>
    <div class="accountingSidebar">
        <ImporterModal
            :show="importerVisible"
            :period="period"
            @close="toggleImporter"
            @loading="$emit('loading')"
            @loadingCompleted="$emit('loadingCompleted')"
            @dataImported="$emit('dataImported')"
        />

        <ConnectionModal
            :planning="createConnectionData.planningData"
            :accounting="createConnectionData.accountingData"
            :show="showModal"
            :desired-amount="createConnectionData.desiredAmount"
            @close="closeModal"
            @doAccountingPlanningConnection="doAccountingPlanningConnection"
        />
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
                        @click="toggleImporter"
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
            class="mb-1"
        >
            <Search @searched="accountingSearched" />
        </div>
        <div class="filter mb-2 text-right">
            Erledigte:
            <toggle-button
                v-model="showFinishedAccountings"
                :width="toggleWidth"
                :color="{checked: '#919191', unchecked: '#E9ECEF'}"
            />
            Unerledigte:
            <toggle-button
                v-model="showUnfinishedAccountings"
                :width="toggleWidth"
                :color="{checked: '#919191', unchecked: '#E9ECEF'}"
            />
        </div>

        <div
            v-if="filteredAccounting.length > 0"
            class="accounting-elements"
        >
            <div
                v-for="(item) in filteredAccounting"
                :key="item.id"
            >
                <AccountingElement
                    :accounting-data="item"
                    :show-connect-target="accountingConnectable(item.id)"
                    :class="accountingClass(item.id)"
                    :year="period.year"
                    :month="period.month"
                    @updateData="updateAccounting"
                    @deleteAccounting="deleteAccounting"
                    @doConnection="doShowConnectionModal"
                    @deleteConnection="deleteConnection"
                    @updateConnectedPlanning="updateConnectedPlanning"
                />
            </div>
        </div>
        <div v-else-if="searchQuery.length > 0">
            <div
                class="alert alert-light"
                role="alert"
            >
                Für den eingegebenen Suchbegriff wurden keine Einträge gefunden.
            </div>
        </div>
        <div v-else>
            <div
                class="alert alert-info"
                role="alert"
            >
                Keine Umsätze vorhanden
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import Search from "../tools/Search";
import AccountingElement from "./AccountingElement";
import ConnectionModal from "./ConnectionModal";
import ImporterModal from "./Importer/ImporterModal";

export default {
    name: "AccountingSidebar",
    components: {
        Search,
        AccountingElement,
        ConnectionModal,
        ImporterModal
    },
    props: {
        period: {
            type: Object,
            required: true,
            default() {
                return null;
            }
        },
        accountingData: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
        createConnectionData: {
            type: Object,
            required: true,
            default() {
                return {
                    enabled: false,
                    planningId: 0,
                    accountingId: 0,
                    planningTotalAmount: 0,
                    accountingTotalAmount: 0,
                    desiredAmount: 0,
                    accountingData: null,
                    planningData: null
                };
            }
        }
    },
    data() {
        return {
            searchQuery: "",
            showModal: false,
            importerVisible: false,
            temp: false,
            showFinishedAccountings: true,
            showUnfinishedAccountings: true,
            toggleWidth: 35
        };
    },
    computed: {
        sortedAccounting: function() {
            return _.orderBy(this.accountingData, ["isNew", "date"], ["desc", "desc"]);
        },
        filteredAccounting() {
            return this.sortedAccounting.filter(accounting => {
                let display = (accounting.title.toLowerCase().search(this.searchQuery.toLowerCase()) > -1);

                if (!display){
                    let formattedDate = moment(accounting.date).format("DD.MM.YYYY");
                    display = (formattedDate.search(this.searchQuery.toLowerCase()) > -1);
                }

                if (!this.showFinishedAccountings && accounting.remainingAmount === 0.0){
                    display = false;
                }

                if (!this.showUnfinishedAccountings && accounting.remainingAmount !== 0.0){
                    display = false;
                }

                return display;
            });
        }
    },
    methods: {
        toggleImporter(){
            this.importerVisible = !this.importerVisible;
        },
        createNewAccounting() {
            this.$emit("createNewAccounting");
        },
        accountingSearched(query) {
            this.searchQuery = query;
        },
        accountingClass(id) {
            if (this.createConnectionData.enabled && !this.accountingConnectable(id)) {
                return {"deactivated": true};
            } else {
                return {"activated": true};
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
            if (this.createConnectionData.enabled && this.createConnectionData.planningData !== null){
                let accountingAmount = this.getAccountingById(id).remainingAmount;
                let planningAmount = this.createConnectionData.planningData.totalAmount;

                if (accountingAmount !== 0.0){
                    if ((planningAmount < 0 && accountingAmount < 0) ||
                        (planningAmount > 0 && accountingAmount > 0)
                    ) {
                        return true;
                    }
                }
            }

            return false;
        },
        updateAccounting(updatedAccounting) {
            this.$emit("updateAccounting", updatedAccounting);
        },
        deleteAccounting(accountingToDelete){
            this.$emit("deleteAccounting", accountingToDelete);
        },
        deleteConnection(accountId, connectedElementToRemove){
            this.$emit("deleteConnection", accountId, connectedElementToRemove);
        },
        updateConnectedPlanning(updatedPlanningItem, accountingId) {
            this.$emit("updateConnectedPlanning", updatedPlanningItem, accountingId);
        },
        closeModal() {
            this.showModal = false;
        },
        doShowConnectionModal(accountId){
            let acounntingData = this.getAccountingById(accountId);
            let planningData = this.createConnectionData.planningData;

            this.createConnectionData.accountingData = acounntingData;
            this.createConnectionData.accountingId = accountId;
            this.createConnectionData.accountingTotalAmount = acounntingData.remainingAmount;
            this.createConnectionData.planningTotalAmount = planningData.totalAmount;

            //make sure the desired amount for the connection is not greater than the remaining amount
            //of the accounting element
            if (this.createConnectionData.accountingData.remainingAmount < 0){
                if (this.createConnectionData.accountingData.remainingAmount - planningData.totalAmount < 0) {
                    this.createConnectionData.desiredAmount = planningData.totalAmount;
                }else{
                    this.createConnectionData.desiredAmount = acounntingData.remainingAmount;
                }
            }

            if (this.createConnectionData.accountingData.remainingAmount > 0){
                if (this.createConnectionData.accountingData.remainingAmount - this.createConnectionData.planningTotalAmount > 0) {
                    this.createConnectionData.desiredAmount = this.createConnectionData.planningTotalAmount;
                }else{
                    this.createConnectionData.desiredAmount = this.createConnectionData.accountingData.remainingAmount;
                }
            }
            this.showModal = true;
        },
        doAccountingPlanningConnection(planning, accounting, desiredAmount){
            this.showModal = false;
            this.$emit("doAccountingPlanningConnection", planning, accounting, desiredAmount);
        },
    }
};
</script>

<style scoped>
    .filter label {
        padding: 0;
        margin: 0;
    }
</style>
