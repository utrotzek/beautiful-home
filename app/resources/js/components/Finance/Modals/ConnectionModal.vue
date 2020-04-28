<template>
    <transition
        v-if="show"
        name="modal"
    >
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div
                    class="modal-dialog"
                    role="document"
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                Zuordnen
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="close"
                            >
                                <span
                                    aria-hidden="true"
                                >&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p><strong>{{ accounting.title }}</strong> mit Kostenstelle <strong>{{ planning.costCenter.title }}</strong> verknüpfen.</p>
                            <div class="form-group row">
                                <label
                                    for="desiredAmount"
                                    class="col-2 col-form-label"
                                >Betrag</label>
                                <div class="col-6">
                                    <input
                                        id="desiredAmount"
                                        v-model="localDesiredAmount"
                                        type="text"
                                        class="form-control"
                                    >
                                </div>
                                <div class="col-4">
                                    <button
                                        v-if="remainingAmountAfterConnection !== 0"
                                        class="btn btn-secondary use-full-amount"
                                        @click="useFullAmountForConnection"
                                    >
                                        <span class="fa fa-hand-holding-usd"></span>
                                    </button>
                                </div>
                            </div>

                            <div v-if="remainingAmountAfterConnection !== 0">
                                <div>
                                    Es bleibt dann ein Restbetrag von {{ remainingAmountAfterConnection }} €
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                @click="close"
                            >
                                <i class="fas fa-ban"></i>
                                Abbrechen
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary do-connection"
                                @click="doAccountingPlanningConnection"
                            >
                                <i class="fas fa-link"></i>
                                Zuordnen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ConnectionModal",
    props: {
        accounting: {
            type: Object,
            required: false,
            default: null
        },
        planning: {
            type: Object,
            required: false,
            default: null
        },
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        desiredAmount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    data() {
        return {
            localDesiredAmount: this.desiredAmount
        };
    },
    computed: {
        remainingAmountAfterConnection: function () {
            let sum = parseFloat(this.accounting.remainingAmount) - parseFloat(this.localDesiredAmount);
            return parseFloat(sum).toFixed(2);
        }
    },
    watch: {
        desiredAmount() {
            this.localDesiredAmount = this.desiredAmount;
        }
    },
    methods: {
        close (){
            this.$emit("close");
        },
        doAccountingPlanningConnection() {
            this.$emit("doAccountingPlanningConnection", this.planning, this.accounting, this.localDesiredAmount);
        },
        useFullAmountForConnection() {
            this.localDesiredAmount = this.accounting.remainingAmount;
        },
    }
};
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
</style>
