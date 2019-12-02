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
            <span v-if="!editMode">{{ localPlanningItem.date }}</span>
            <input
                v-else
                v-model="localPlanningItem.date"
                type="text"
                class="form-control"
            >
        </div>
        <div class="title">
            <div class="float-left">
                <span v-if="!editMode">{{ localPlanningItem.title }}</span>
                <input
                    v-else
                    v-model="localPlanningItem.title"
                    type="text"
                    class="form-control"
                >
            </div>
            <div
                class="float-right"
                :class="classObject"
            >
                <span v-if="!editMode">{{ localPlanningItem.totalAmount }}</span>
                <input
                    v-else
                    v-model="localPlanningItem.totalAmount"
                    type="text"
                    class="form-control"
                >
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="description">
            <span v-if="!editMode">{{ localPlanningItem.description }}</span>
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
                v-if="!editMode"
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

import ButtonRow from "../../../js/components/tools/ButtonRow";

export default {
    name: "PlanningElementVue",
    components: {
        ButtonRow
    },
    props: {
        planningItem: {
            type: Object,
            required: true,
            default() {
                return {
                    id: 1,
                    title: "MyPlanning Item",
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
        }
    },
    data() {
        return {
            displayOverlay: false,
            localPlanningItem: this.planningItem,
            originalPlanningItem: this.planningItem
        };
    },
    computed: {
        classObject() {
            return {
                "negative": this.localPlanningItem.totalAmount < 0,
                "positive": this.localPlanningItem.totalAmount >= 0
            };
        }
    },
    watch: {
        editMode () {
            //remember original value
            this.originalPlanningItem = JSON.parse(JSON.stringify(this.localPlanningItem));
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
            this.$emit("edit", this.localPlanningItem.id, true);
        },
        cancelEdit(){
            this.localPlanningItem = this.originalPlanningItem;
            this.$emit("cancel", this.localPlanningItem.id, true);
        },
        saveEdit(){
            this.$emit("save", this.planningItem, true);
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
</style>
