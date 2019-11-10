<template>
    <div
        ref="planningElement"
        class="planningElement"
        @click="showOverlay"
    >
        <div v-if="hasDate" class="date">
            {{ date }}
        </div>
        <div class="title">
            <div class="float-left">
                {{ title }}
            </div>
            <div
                class="float-right"
                :class="classObject"
            >
                {{ totalAmount }} €
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="description">
            {{ description }}
        </div>

        <div
            v-if="displayOverlay"
            class="overlay"
        >
            <ButtonRow
                show-delete
                show-edit
                :show-connect="!isConnected"
                @close="closeOverlay"
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
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        isConnected: {
            type: Boolean,
            default: false
        },
        hasDate: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            displayOverlay: false
        };
    },
    computed: {
        classObject() {
            return {
                "negative": this.totalAmount < 0,
                "positive": this.totalAmount >= 0
            };
        }
    },
    methods: {
        showOverlay() {
            this.displayOverlay = true;
        },
        closeOverlay() {
            this.displayOverlay = false;
        },
        deleteElement() {
            this.$emit("delete", this.id);
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
