<template>
    <div class="planningElement">
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

        };
    },
    computed: {
        classObject() {
            return {
                "negative": this.totalAmount < 0,
                "positive": this.totalAmount >= 0
            };
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