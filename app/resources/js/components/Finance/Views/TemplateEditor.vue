<template>
    <div class="template-editor">
        <Progressbar
            ref="topProgress"
            color="#f8f9fa"
        />
        <div
            v-if="dataLoaded"
            class="content"
        >
            <Headline :text="completeHeadline" />
            <div
                class="row"
            >
                <div class="col-6">
                    <div id="planning">
                        <PlanningSidebar
                            :headline="planningSidebarHeadline"
                            :year="year"
                            :month="month"
                            :planning-data="planningData"
                            :cost-center-data="costCenterData"
                            @createNewPlanning="createNewPlanning"
                            @save="savePlanning"
                            @deletePlanning="deletePlanning"
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div id="overview">
                        <h2>Übersicht</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import PlanningSidebar from "../PlanningSidebar";
import Headline from "../../Headline";
import moment from "moment";

export default {
    name: "TemplateEditor",
    components: {
        PlanningSidebar,
        Headline
    },
    props: {
        templateId: {
            type: Number,
            required: true,
            default: null
        }
    },
    data() {
        return {
            year: 3000,
            month: 1,
            template: null,
            planningData: [],
            costCenterData: [],
            planningSidebarHeadline: "Wiederkehrende Einträge",
            headline: "Vorlage ",
            headlineSuffix: "",
            progressBarCount: 0,
            dataLoaded: false
        };
    },
    computed: {
        completeHeadline() {
            return this.headline + this.headlineSuffix;
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.startProgressBar();
            const templatePromose = window.axios.get("/api/finance/template/" + this.templateId)
                .then(res => {
                    this.template = res.data;

                    this.headlineSuffix = "'" + this.template.title + "'";
                });

            const planningDataPromise = window.axios.get("/api/finance/plannings/forTemplate/" + this.templateId)
                .then(res => {
                    this.planningData = res.data;
                });

            const costCenterPromise = window.axios.get("/api/finance/costCenter")
                .then(res => {
                    this.costCenterData = res.data;
                });

            await templatePromose;
            await planningDataPromise;
            await costCenterPromise;
            this.dataLoaded = true;
            this.stopProgressBar();
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
        getPlanningById(id){
            let i=0;
            for(i=0; i < this.planningData.length;i++){
                if (id === this.planningData[i].id)  {
                    return this.planningData[i];
                }
            }
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
        createNewPlanning() {
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
                    template: this.template
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
        getUniquePlanningId() {
            let i = 0, maxId = 0;
            for (i=0; i < this.planningData.length; i++){
                if (this.planningData[i].id > maxId){
                    maxId = this.planningData[i].id;
                }
            }
            return maxId + 1;
        },
    }
};
</script>

<style scoped>

</style>
