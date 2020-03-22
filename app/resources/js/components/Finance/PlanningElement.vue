<template>
    <div
        ref="planningElement"
        class="planningElement form-group"
        @click="showOverlay"
    >
        <div
            v-if="hasDate"
            class="date"
        >
            <span v-if="!localEditMode">{{ localPlanningItem.date | formatDate }}</span>
            <v-date-picker
                v-else
                v-model="date"
                :popover="{visibility: 'focus', placement: 'bottom', keepVisibleOnInput: false}"
                :available-dates="{ start: startDate, end: endDate }"
                :attributes="vCalendarAttributes"
            />
        </div>
        <div class="title">
            <div class="float-left">
                <span v-if="!localEditMode">{{ localPlanningItem.costCenter.title }}</span>
                <AutoCompleter
                    v-else
                    :items="costCenterData"
                    :enable-inline-creation="false"
                    :show-all-items-on-empty-query="true"
                    :preselected-value="localPlanningItem.costCenter.id"
                    search-key="title"
                    value-key="id"
                    placeholder="Kosten stelle wählen"
                    @selected="costCenterUpdate"
                />
            </div>
            <div
                class="float-right text-right"
                :class="negativePostiveClass"
            >
                <span v-if="!localEditMode">{{ localPlanningItem.totalAmount | toCurrency }}</span>
                <input
                    v-else
                    v-model="localPlanningItem.totalAmount"
                    type="text"
                    class="form-control text-right"
                    :class="negativePostiveClass"
                >
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="description">
            <span v-if="!localEditMode">{{ localPlanningItem.description }}</span>
            <textarea
                v-else
                v-model="localPlanningItem.description"
                rows="3"
                class="form-control"
            ></textarea>
        </div>

        <div
            v-if="displayOverlay"
            class="overlay"
        >
            <ButtonRow
                v-if="!localEditMode"
                show-delete
                show-edit
                show-close
                :show-connect="!isConnected"
                @close="closeOverlay"
                @edit="editPlanning"
                @connect="connectPlanning"
                @deleteClick="deletePlanning"
            />

            <ButtonRow
                v-else
                show-save
                show-cancel
                @close="closeOverlay"
                @save="saveEdit"
                @cancel="cancelEdit"
            />
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import ButtonRow from "../../../js/components/tools/ButtonRow";
import AutoCompleter from "../../../js/components/tools/Autocompleter";

export default {
    name: "PlanningElementVue",
    components: {
        ButtonRow,
        AutoCompleter
    },
    props: {
        year: {
            type: Number,
            required: true,
            default: 2020
        },
        month: {
            type: Number,
            required: true,
            default: 10
        },
        planningItem: {
            type: Object,
            required: true,
            default() {
                return {
                    id: 1,
                    costCenter: {
                        id: 100,
                        title: "MyPlanning Item"
                    },
                    description: "My description",
                    totalAmount: 100,
                    date: "01.01.1970"
                };
            }
        },
        isConnected: {
            type: Boolean,
            default: false
        },
        hasDate: {
            type: Boolean,
            default: true
        },
        clickEnabled: {
            type: Boolean,
            default: true
        },
        editMode: {
            type: Boolean,
            default: false
        },
        costCenterData: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            localEditMode: this.editMode,
            displayOverlay: false,
            localPlanningItem: this.planningItem,
            originalPlanningItem: _.clone(this.planningItem),
            date: moment(this.planningItem.date).toDate(),
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
        negativePostiveClass() {
            return {
                "negative": this.localPlanningItem.totalAmount < 0,
                "positive": this.localPlanningItem.totalAmount >= 0
            };
        },
        startDate() {
            return moment(this.year + "-" + this.month + "-1").toDate();
        },
        endDate() {
            return moment(this.year + "-" + this.month + "-1").endOf("month").toDate();
        }
    },
    watch: {
        localEditMode () {
            //remember original value
            this.originalPlanningItem = _.clone(this.localPlanningItem);
        }
    },
    methods: {
        showOverlay() {
            if (this.clickEnabled){
                this.displayOverlay = true;
            }
        },
        closeOverlay() {
            this.displayOverlay = false;
            this.$emit("close", this.localPlanningItem.id);
        },
        deletePlanning() {
            this.$emit("delete", this.localPlanningItem.id);
        },
        connectPlanning() {
            this.$emit("connect", this.localPlanningItem.id);
        },
        editPlanning() {
            this.localEditMode = true;
        },
        cancelEdit(){
            this.localPlanningItem = this.originalPlanningItem;
            this.localEditMode = false;
            this.displayOverlay = false;
            this.$emit("cancel", this.localPlanningItem);
        },
        saveEdit(){
            this.localPlanningItem.date = this.date;
            this.localEditMode = false;
            this.displayOverlay = false;
            this.$emit("save", this.localPlanningItem, true);
        },
        costCenterUpdate(item){
            this.localPlanningItem.costCenter = item;
        }
    }
};
</script>

<style scoped>
    .planningElement {
        cursor: pointer;
    }
    .date {
        font-size: 80%;
    }
    .planningElement {
        border: solid #adb5bd 1px;
        padding: 8px;
        margin: 0 0 1em 0;
    }

    .planningElement .description {
        font-size: 70%;
        margin: 0;
        word-wrap: break-word;
    }

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }

    .title {
        position: relative;
    }

    .title .float-left {
        width: 70%
    }

    .title .float-right {
        width: 30%
    }
</style>
