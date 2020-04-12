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
                            :headline="Planungen"
                            :year="3000"
                            :month="1"
                            :planning-data="planningData"
                            :cost-center-data="costCenterData"
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
            template: null,
            planningData: [],
            costCenterData: [],
            headline: "Planungs editor für ",
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
    }
};
</script>

<style scoped>

</style>
