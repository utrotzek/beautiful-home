<template>
    <div class="accounting-element row mb-3">
        <div class="col accounting-element-inner">
            <div
                v-if="!localAccountingData.editMode"
                class="delete-element"
            >
                <button
                    title="Bearbeiten"
                    @click="startEditing"
                >
                    <i class="fa fa-edit"></i>
                </button>
                <button
                    title="Bearbeiten"
                    @click="deleteAccounting"
                >
                    <i class="fa fa-trash-alt"></i>
                </button>
            </div>

            <div class="row">
                <div class="date col-9">
                    <span v-if="!localAccountingData.editMode">{{ localAccountingData.date | formatDate }}</span>
                    <v-date-picker
                        v-else
                        v-model="date"
                        :popover="{visibility: 'focus', placement: 'bottom', keepVisibleOnInput: false}"
                        :available-dates="{ start: startDate, end: endDate }"
                        :attributes="vCalendarAttributes"
                    />
                </div>
            </div>
            <div class="row">
                <div class="accounting-title col-9">
                    <span
                        v-if="showCheck && !localAccountingData.editMode"
                        class="fa fa-check-circle check"
                    ></span>
                    <span
                        v-else-if="!localAccountingData.editMode"
                        class="fa fa-exclamation-circle todo"
                    >
                    </span>
                    <span
                        v-if="!localAccountingData.editMode"
                        class="pre-formatted"
                    >{{ localAccountingData.title }}</span>
                    <textarea
                        v-else
                        v-model="$v.localAccountingData.title.$model"
                        type="text"
                        class="form-control"
                        :class="errorClass($v.localAccountingData.title)"
                    >
                    </textarea>
                </div>
                <div
                    class="remaining-amount col-3"
                    :class="classObject"
                >
                    <span v-if="!showCheck && !localAccountingData.editMode">{{ localAccountingData.remainingAmount | toCurrency }} €</span>
                    <input
                        v-else-if="localAccountingData.editMode"
                        v-model="$v.localAccountingData.totalAmount.$model"
                        type="text"
                        class="form-control text-right"
                        :class="errorClass($v.localAccountingData.totalAmount)"
                    >
                </div>
            </div>

            <div
                v-if="!localAccountingData.editMode"
                class="row relatedElements"
            >
                <div
                    v-for="(planningElement) in localAccountingData.connectedPlanning"
                    :key="planningElement.id"
                    class="col-12 col-md-6"
                >
                    <PlanningElement
                        is-connected
                        :has-date="false"
                        :planning-item="planningElement"
                        :edit-mode="planningElement.editMode"
                        :month="month"
                        :year="year"
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
                <div
                    v-else
                    class="col-12 col-md-6"
                >
                    <div
                        class="connectPlaceholder"
                    >
                        <span class="fa align-middle"></span>
                    </div>
                </div>
            </div>
            <div
                v-else
            >
                <ButtonRow
                    show-save
                    show-cancel
                    :disabled="$v.$anyError"
                    @save="save"
                    @cancel="cancel"
                />
            </div>
        </div>
    </div>
</template>

<script>

import _ from "lodash";
import moment from "moment";
import PlanningElement from "../../../js/components/Finance/PlanningElement";
import ButtonRow from "../../../js/components/tools/ButtonRow";
import { required } from "vuelidate/lib/validators";

const notZero = (value) => value > 0 || value < 0;

export default {
    name: "AccountingElementVue",

    components: {
        PlanningElement,
        ButtonRow
    },
    props: {
        year: {
            type: Number,
            require: true,
            default: 2020
        },
        month: {
            type: Number,
            require: true,
            default: 10
        },
        showConnectTarget: {
            type: Boolean,
            require: false,
            default: false
        },
        accountingData: {
            type: Object,
            require: true,
            default() {
                return null;
            }
        }
    },
    data() {
        return {
            localAccountingData: this.accountingData,
            originalAccountingData: null,
            date: moment(this.accountingData.date).toDate(),
            vCalendarAttributes: [
                {
                    key: "today",
                    dot: "red",
                    dates: new Date(),
                },
            ]
        };
    },
    computed: {
        showCheck() {
            return this.localAccountingData.remainingAmount === 0;
        },
        classObject() {
            return {
                "negative": this.localAccountingData.remainingAmount < 0,
                "positive": this.localAccountingData.remainingAmount >= 0
            };
        },
        startDate() {
            return moment(this.year + "-" + this.month + "-1").toDate();
        },
        endDate() {
            return moment(this.year + "-" + this.month + "-1").endOf("month").toDate();
        }
    },
    mounted(){
        this.originalAccountingData =  _.clone(this.accountingData);

        this.$watch(
            "localAccountingData.totalAmount", //what you want to watch
            () => {
                if (this.localAccountingData.totalAmount === "0"){
                    this.localAccountingData.totalAmount = "";
                }

                if (this.localAccountingData.isNew){
                    this.localAccountingData.remainingAmount = this.localAccountingData.totalAmount;
                }
            }
        );


    },
    validations: {
        localAccountingData: {
            totalAmount: {
                required,
                notZero
            },
            title: {
                required
            }
        },
    },
    methods: {
        errorClass(validator) {
            return {
                "is-invalid": validator.$error,
            };
        },
        startEditing(){
            this.localAccountingData.editMode = true;
        },
        doConnection(){
            this.$emit("doConnection", this.localAccountingData.id);
        },
        removeFromArray(arrayList, id){
            return arrayList.filter(function(ele){
                return ele.id !== id;
            });
        },
        deletePlanning(id) {
            this.$emit("deleteConnection", this.localAccountingData.id, this.getPlanningById(id));
        },
        editPlanning(id, enabled) {
            this.getPlanningById(id).editMode = enabled;
        },
        getPlanningById(id){
            let i=0;
            for(i=0; i < this.localAccountingData.connectedPlanning.length;i++){
                if (id === this.localAccountingData.connectedPlanning[i].id)  {
                    return this.localAccountingData.connectedPlanning[i];
                }
            }
        },
        saveEditPlanning(newPlanningItem){
            newPlanningItem.editMode = false;
            this.setPlanningById(newPlanningItem.id, newPlanningItem);
            this.$emit("updateConnectedPlanning", newPlanningItem, this.localAccountingData.id);
        },
        setPlanningById(id, item){
            let i=0;
            for(i=0; i < this.localAccountingData.connectedPlanning.length;i++){
                if (id === this.localAccountingData.connectedPlanning[i].id)  {
                    this.localAccountingData.connectedPlanning[i] = item;
                }
            }
        },
        deleteAccounting() {
            this.$emit("deleteAccounting", this.localAccountingData);
        },
        cancel(){
            if (!this.localAccountingData.isNew){
                this.localAccountingData.title = this.originalAccountingData.title;
                this.localAccountingData.totalAmount = this.originalAccountingData.totalAmount;
                this.localAccountingData.date = this.originalAccountingData.date;
                this.localAccountingData.editMode = false;
            }else {
                this.deleteAccounting();
            }
        },
        save(){
            this.$v.$touch();

            if (!this.$v.$invalid){
                this.localAccountingData.date = this.date;
                this.localAccountingData.editMode = false;
                this.$emit("updateData", this.localAccountingData);
            }
        }
    }
};
</script>

<style scoped>

    .connectPlaceholder {
        text-align: center;
        vertical-align: middle;
        border: none;
        margin: 0 0 1em 0;
        height: 2rem;
    }

    .connectTarget {
        text-align: center;
        vertical-align: middle;
        border: dashed #adb5bd 2px;
        margin: 0 0 1em 0;
        height: 2rem;
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

    .pre-formatted {
        white-space: pre-wrap;
    }
</style>
