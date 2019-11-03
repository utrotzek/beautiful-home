<template>
    <div
        ref="planningElement"
        class="planningElement"
        @click="showOverlay"
    >
        <div class="date">
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
            <div
                role="group"
                aria-label="Basic example"
                class="btn-group d-flex"
            >
                <button
                    type="button"
                    class="btn btn-light"
                >
                    <i class="fas fa-link"></i> <span class="d-none d-sm-inline">Zuordnen</span>
                </button> <button
                    type="button"
                    class="btn btn-light"
                >
                    <i class="fas fa-trash"></i> <span class="d-none d-sm-inline">Löschen</span>
                </button>

                <button
                    type="button"
                    class="btn btn-light"
                    @click.stop
                    @click="closeOverlay"
                >
                    <i class="fas fa-ban"></i> <span class="d-none d-sm-inline">Schließen</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlanningElementVue",
    props: {
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
        }
    }
};
</script>

<style scoped>
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