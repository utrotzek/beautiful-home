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
                    {{ accountingTitle }}
                </div>
                <div
                    class="remaining-amount col-4"
                    :class="classObject"
                >
                    {{ remainingAmount }} €
                </div>
            </div>

            <div class="row relatedElements">
                <div
                    v-for="(planningElement, key) in planningElements"
                    :key="planningElement.id"
                    class="col-12 col-md-6"
                >
                    <PlanningElement
                        is-connected
                        :description="planningElement.description"
                        :title="planningElement.title"
                        :total-amount="planningElement.totalAmount"
                        :date="planningElement.date"
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

        remainingAmount: {
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
            ]
        };
    },
    computed: {
        classObject() {
            return {
                "negative": this.remainingAmount < 0,
                "positive": this.remainingAmount >= 0
            };
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

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }
</style>
