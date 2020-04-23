<template>
    <div class="planningSidebar">
        <TemplateSelector
            :show="showTemplateSelector"
            @close="toggleTemplateSelector"
            @templateSelected="importTemplate"
        />
        <div class="row">
            <div class="col-8">
                <h2 class="d-none d-md-block">
                    {{ headline }}
                </h2>
            </div>
            <div class="col-12 col-md-4 text-left text-md-right">
                <div
                    id="PlanningButtons"
                    class="mb-3"
                >
                    <button
                        v-if="allowTemplateImport"
                        class="btn btn-outline-dark"
                        title="Einträge aus Vorlage übernehmen"
                        @click="toggleTemplateSelector"
                    >
                        <i class="fa fa-share-square"></i>
                        <span class="d-inline-block d-md-none">
                            Von Vorlage
                        </span>
                    </button>

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
                :planning-item="item"
                :edit-mode="item.editMode"
                :year="year"
                :month="month"
                :cost-center-data="costCenterData"
                :allow-connection="allowConnection"
                @connect="connectPlanning(item.id, true)"
                @delete="deletePlanning(item.id)"
                @close="connectPlanning(item.id, false)"
                @save="savePlanning"
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
import _ from "lodash";
import moment from "moment";
import PlanningElement from "./PlanningElement";
import Search from "../tools/Search";
import TemplateSelector from "./Modals/TemplateSelector";

export default {
    name: "PlanningSidebar",
    components: {
        PlanningElement,
        Search,
        TemplateSelector
    },
    props: {
        headline: {
            type: String,
            required: false,
            default: "Planung"
        },
        year: {
            type: Number,
            required: true,
            default: null
        },
        month: {
            type: Number,
            required: true,
            default: null
        },
        planningData: {
            type: Array,
            required: true,
            default: null
        },
        costCenterData: {
            type: Array,
            required: true,
            default: null
        },
        allowConnection: {
            type: Boolean,
            required: false,
            default: true
        },
        allowTemplateImport: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data () {
        return {
            planningQuery: "",
            showTemplateSelector: false
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
                if (!display && planning.description){
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
        savePlanning(planningItemToUpdate){
            this.$emit("save", planningItemToUpdate);
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
        },
        toggleTemplateSelector() {
            this.showTemplateSelector = !this.showTemplateSelector;
        },
        importTemplate(template) {
            this.$emit("importTemplate", template);
        }
    }
};
</script>

<style scoped>

</style>
