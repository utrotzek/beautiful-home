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
                    {{ accountingDate }}
                </div>
            </div>
            <div class="row">
                <div class="accounting-title col-8">
                    <span
                        v-if="showCheck"
                        class="fa fa-check-circle check"
                    ></span>
                    {{ accountingTitle }}
                </div>
                <div
                    class="remaining-amount col-4"
                    :class="classObject"
                >
                    <span v-if="!showCheck">{{ remainingAmount }} €</span>
                </div>
            </div>

            <div class="row relatedElements">
                <div
                    v-for="(planningElement) in planningElements"
                    :key="planningElement.id"
                    class="col-12 col-md-6"
                >
                    <PlanningElement
                        :id="planningElement.id"
                        is-connected
                        :has-date="false"
                        :description="planningElement.description"
                        :title="planningElement.title"
                        :total-amount="planningElement.totalAmount"
                        :date="planningElement.date"
                        @delete="deletePlanning"
                    />
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
        totalAmount: {
            type: Number,
            required: true
        },

        accountingTitle: {
            type: String,
            required: true
        },

        accountingDate: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            planningElements: [
                {
                    id: 1,
                    totalAmount: -1,
                    title: "Einkaufen",
                    description: "this is my descipriotn",
                    date: "20.10.2019"
                },
                {
                    id: 2,
                    totalAmount: -99,
                    title: "Amazon",
                    description: "Weil das so ist",
                    date: "20.10.2019"
                }
            ],
        };
    },
    computed: {
        remainingAmount() {
            let i = 0,
                remainingAmmount = this.totalAmount;

            for (i  = 0; i < this.planningElements.length; i++){
                remainingAmmount = remainingAmmount - this.planningElements[i].totalAmount;
            }
            return remainingAmmount;
        },
        showCheck() {
            return this.remainingAmount === 0;
        },
        classObject() {
            return {
                "negative": this.remainingAmount < 0,
                "positive": this.remainingAmount >= 0
            };
        }
    },
    methods: {
        removeFromArray(arrayList, id){
            return arrayList.filter(function(ele){
                return ele.id !== id;
            });
        },
        deletePlanning(id) {
            this.planningElements = this.removeFromArray(this.planningElements, id);
        }
    }
};
</script>

<style scoped>
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

    .positive,
    .check {
        color: green;
    }

    .negative {
        color: red;
    }
</style>
