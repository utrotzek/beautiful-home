<template>
    <div class="planningSidebar">
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

        <div
            id="planningSearch"
            class="mb-3"
        >
            <Search @searched="planningSearched" />
        </div>

        <div
            v-for="(item) in filteredPlanning"
            :key="item.id"
        >
            <PlanningElement
                v-if="item.display && (item.totalAmount !== 0 || item.isNew)"
                :class="planningClass(item.id)"
                :planning-item="item"
                :click-enabled="planningClickEnabled(item.id)"
                :edit-mode="item.editMode"
                :year="period.year"
                :month="period.month"
                :cost-center-data="costCenterData"
                @connect="connectPlanning(item.id, true)"
                @delete="deletePlanning(item.id)"
                @close="connectPlanning(item.id, false)"
                @edit="editPlanning"
                @cancel="editPlanning"
                @save="saveEditPlanning"
                @createCostCenter="createCostCenter"
            />
        </div>
        <div v-if="planningData.length !== 0 && filteredPlanning.length === 0">
            <div
                class="alert alert-light"
                role="alert"
            >
                Für den eingegebenen Suchbegriff wurden keine Einträge gefunden.
            </div>
        </div>
        <div
            v-if="noActivePlannings"
            class="alert alert-info"
            role="alert"
        >
            Keine Planungseinträge vorhanden
        </div>
    </div>
</template>

<script>
import moment from "moment";
import PlanningElement from "./PlanningElement";
import Search from "../tools/Search";

export default {
    name: "PlanningSidebar",
    components: {
        PlanningElement,
        Search
    },
    props: {
        period: {
            type: Object,
            reqiored: true,
            default() {
                return null;
            }
        },
        planningData: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
        costCenterData: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        }
    },
    data () {
        return {
            planningQuery: ""
        };
    },
    computed: {
        noActivePlannings() {
            let i = 0;
            for (i=0; i < this.planningData.length; i++){
                let planninigElement = this.planningData[i];
                if (planninigElement.totalAmount !== 0 && !planninigElement.isNew){
                    return false;
                }
            }
            return true;
        },
        orderedPlanning: function() {
            return _.orderBy(this.planningData, ["isNew", "date"], ["desc", "asc"]);
        },
        filteredPlanning() {
            //filters the planning list by title, description and date
            return this.orderedPlanning.filter(planning => {
                let costCenter = planning.costCenter;
                let display = (costCenter.title.toLowerCase().search(this.planningQuery.toLowerCase()) > -1);
                if (!display){
                    display = (planning.description.toLowerCase().search(this.planningQuery.toLowerCase()) > -1);
                }
                if (!display) {
                    let formattedDate = moment(planning.date).format("DD.MM.YYYY");
                    display = (formattedDate.search(this.planningQuery.toLowerCase()) > -1);
                }
                return display;
            });
        },
    },
    methods: {
        planningClickEnabled(id) {
            return !(this.connectPlanningMode && this.connectPlanningId !== id);
        },
        planningClass(id) {
            if (this.connectPlanningMode && this.connectPlanningId !== id){
                return { "deactivated": true };
            }else {
                return { "activated": true };
            }
        },
        editPlanning(planning) {
            planning.editMode = !planning.editMode;
            this.savePlanningById(planning);
        },
        savePlanningById(updatedPlanning){
            let i=0;
            for(i=0; i < this.planningData.length;i++){
                if (updatedPlanning.id === this.planningData[i].id)  {
                    this.planningData[i] = updatedPlanning;
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
        saveEditPlanning(newPlanningItem){
            this.getPlanningById(newPlanningItem.id).editMode = false;
            this.$emit("save", newPlanningItem);
        },
        planningSearched(query) {
            this.planningQuery = query;
        },
        createNewPlanning() {
            this.$emit("createNewPlanning");
        },
        deletePlanning(id) {
            this.$emit("deletePlanning", id);
        },
        connectPlanning(id, enabled) {
            this.$emit("connectPlanning", id, enabled);
        },
        createCostCenter(newCostCenter) {
            this.$emit("createCostCenter", newCostCenter);
        }
    }
};
</script>

<style scoped>

</style>
