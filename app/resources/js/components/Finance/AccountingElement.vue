<template>
    <div class="accounting-element row mb-3">
        <div class="col accounting-element-inner">
            <div class="delete-element">
                <button>
                    <i class="fa fa-trash-alt"></i>
                </button>
            </div>

            <div class="row">
                <div class="date col-12">
                    {{ accountingData.date }}
                </div>
            </div>
            <div class="row">
                <div class="accounting-title col-8">
                    <span
                        v-if="showCheck"
                        class="fa fa-check-circle check"
                    ></span>
                    <span
                        v-else
                        class="fa fa-exclamation-circle todo"
                    >
                    </span>
                    {{ accountingData.title }}
                </div>
                <div
                    class="remaining-amount col-4"
                    :class="classObject"
                >
                    <span v-if="!showCheck">{{ accountingData.remainingAmount }} €</span>
                </div>
            </div>

            <div class="row relatedElements">
                <div
                    v-for="(planningElement) in accountingData.connectedPlanning"
                    :key="planningElement.id"
                    class="col-12 col-md-6"
                >
                    <PlanningElement
                        is-connected
                        :has-date="false"
                        :planning-item="planningElement"
                        :edit-mode="planningElement.editMode"
                        @delete="deletePlanning(planningElement.id)"
                        @edit="editPlanning(planningElement.id, true)"
                        @cancel="editPlanning(planningElement.id, false)"
                        @save="saveEditPlanning"
                    />
                </div>
                <div
                    v-if="showConnectTarget"
                    class="col-12 col-md-6"
                >
                    <div
                        class="connectTarget"
                        @click="doConnection"
                    >
                        <span class="fa fa-plus-circle align-middle"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import PlanningElement from "../../../js/components/Finance/PlanningElement";

export default {
    name: "AccountingElementVue",

    components: {
        PlanningElement
    },
    props: {
        showConnectTarget: {
            type: Boolean,
            require: false,
            default: false
        },
        accountingData: {
            type: Object,
            require: true,
            default() {
                return {
                    id: 1,
                    title: "Westdeutsche Lotterie GmbH & Co. OHG westlotto.de",
                    totalAmount: -100,
                    remainingAmount: 0,
                    date: "12.10.2019",
                    display: true,
                    connectedPlanning: [
                        {
                            id: 1,
                            totalAmount: -1,
                            title: "Einkaufen",
                            description: "this is my descipriotn",
                            display: true,
                            editMode:  false
                        },
                        {
                            id: 2,
                            totalAmount: -99,
                            title: "Amazon",
                            description: "Weil das so ist",
                            display: true,
                            editMode:  false
                        }
                    ],
                };
            }
        }
    },
    data() {
        return {
        };
    },
    computed: {
        showCheck() {
            return this.accountingData.remainingAmount === 0;
        },
        classObject() {
            return {
                "negative": this.accountingData.remainingAmount < 0,
                "positive": this.accountingData.remainingAmount >= 0
            };
        },
    },
    methods: {
        doConnection(){
            this.$emit("doConnection", this.accountingData.id);
        },
        removeFromArray(arrayList, id){
            return arrayList.filter(function(ele){
                return ele.id !== id;
            });
        },
        deletePlanning(id) {
            this.$emit("deleteConnection", this.accountingData.id, id);
        },
        editPlanning(id, enabled) {
            this.getPlanningById(id).editMode = enabled;
        },
        getPlanningById(id){
            let i=0;
            for(i=0; i < this.accountingData.connectedPlanning.length;i++){
                if (id === this.accountingData.connectedPlanning[i].id)  {
                    return this.accountingData.connectedPlanning[i];
                }
            }
        },
        saveEditPlanning(newPlanningItem){
            newPlanningItem.editMode = false;
            this.setPlanningById(newPlanningItem.id, newPlanningItem);
            this.$emit("updateConnectedPlanning", newPlanningItem, this.accountingData.id);
        },
        setPlanningById(id, item){
            let i=0;
            for(i=0; i < this.accountingData.connectedPlanning.length;i++){
                if (id === this.accountingData.connectedPlanning[i].id)  {
                    this.accountingData.connectedPlanning[i] = item;
                }
            }
        },
    }
};
</script>

<style scoped>
    .connectTarget {
        text-align: center;
        vertical-align: middle;
        border: dashed #adb5bd 2px;
        padding: 8px;
        margin: 0 0 1em 0;
        height: 3rem;
        cursor: pointer;
    }

    .connectTarget:hover{
        background-color: #dee2e6;
    }

    .accounting-element-inner {
        border: solid #adb5bd 1px;
        padding: 10px 15px 10px 10px;
    }

    .delete-element{
        position: absolute;
        right: 8px;
        top: 2px;
        z-index: 100;
    }

    .delete-element button {
        background-color: transparent;
        border:none;
    }

    .remaining-amount {
        text-align: right;
    }

    .date {
        font-size: 80%;
    }

    .relatedElements{
        margin-top: 1rem;
    }

    /*noinspection CssUnusedSymbol*/
    .positive,
    .check {
        color: green;
    }

    .todo {
        color: orange;
    }

    /*noinspection ALL*/
    .negative {
        color: red;
    }
</style>
