<template>
    <div
        ref="planningElement"
        class="planningElement form-group"
        @click="showOverlay"
    >
        <Progressbar
            ref="topProgress"
            color="#f8f9fa"
        />

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
                    :enable-inline-creation="true"
                    :show-all-items-on-empty-query="true"
                    :preselected-value="localPlanningItem.costCenter.id"
                    search-key="title"
                    value-key="id"
                    placeholder="Kostenstelle wählen"
                    :class="errorClass($v.localPlanningItem.costCenter.id)"
                    @selected="costCenterUpdate"
                    @create="createCostCenter"
                />
            </div>
            <div
                class="float-right text-right"
                :class="negativePostiveClass"
            >
                <span v-if="!localEditMode">{{ localPlanningItem.totalAmount | toCurrency }}</span>
                <input
                    v-else
                    v-model="$v.localPlanningItem.totalAmount.$model"
                    type="text"
                    class="form-control text-right"
                    :class="[negativePostiveClass, errorClass($v.localPlanningItem.totalAmount)]"
                >
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="description">
            <span v-if="!localEditMode" class="pre-formatted">{{ localPlanningItem.description }}</span>
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
                :disabled="$v.$anyError"
                @close="closeOverlay"
                @edit="editPlanning"
                @connect="connectPlanning"
                @deleteClick="deletePlanning"
            />

            <ButtonRow
                v-else
                show-save
                show-cancel
                :disabled="$v.$anyError"
                @close="closeOverlay"
                @save="saveEdit"
                @cancel="cancelEdit"
            />
        </div>
    </div>
</template>

<script>
import { required, integer } from "vuelidate/lib/validators";
import _ from "lodash";
import moment from "moment";
import ButtonRow from "../../../js/components/tools/ButtonRow";
import AutoCompleter from "../../../js/components/tools/Autocompleter";

const notZero = (value) => value > 0 || value < 0;
//99999 is the default entry for new planning elements
const notDefaultCostCenterId = (value) => value !== 99999;

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
            required: false,
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
    validations: {
        localPlanningItem: {
            costCenter: {
                id: {
                    required,
                    integer,
                    notDefaultCostCenterId
                }
            },
            totalAmount: {
                required,
                notZero
            }
        },
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
    mounted() {
        this.$watch(
            "localPlanningItem.totalAmount", //what you want to watch
            () => {
                if (this.localPlanningItem.totalAmount === "0"){
                    this.localPlanningItem.totalAmount = "";
                }
            }
        );
    },
    methods: {
        errorClass(validator) {
            return {
                "is-invalid": validator.$error,
            };
        },
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
            if (!this.localPlanningItem.isNew){
                this.localPlanningItem = this.originalPlanningItem;
                this.localEditMode = false;
                this.displayOverlay = false;
                this.$emit("cancel", this.localPlanningItem);
            }else{
                this.deletePlanning();
            }
        },
        saveEdit(){
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.localPlanningItem.date = this.date;
                //workaround to avoid multiple creation of plannign elements when the element gets created via the
                //ui and edit it again before freshing the page.
                this.localPlanningItem.isNew = this.planningItem.isNew;
                this.localEditMode = false;
                this.displayOverlay = false;
                this.$emit("save", this.localPlanningItem, true);
            }
        },
        costCenterUpdate(item){
            this.$v.localPlanningItem.costCenter.id.$touch();
            this.localPlanningItem.costCenter = item;
        },
        createCostCenter(newCostCenterName){
            this.$refs.topProgress.start();

            window.axios.post("/api/finance/costCenter", {title: newCostCenterName})
                .then(res => {
                    this.$emit("createCostCenter", res.data);
                    this.$refs.topProgress.done();
                });

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

    .pre-formatted {
        white-space: pre-wrap;
    }
</style>
