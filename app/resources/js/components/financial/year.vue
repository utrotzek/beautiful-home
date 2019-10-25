<template>
    <div>
        <button 
                class="btn btn-default text-left decrease-year"
                @click="decreaseYear()"
        >
            <span class="fa fa-minus-circle"></span>
        </button> 
        
        <span class="year-label">{{ currentYear }}</span>

        <button
                class="btn btn-default text-left increase-year"
                @click="increaseYear()"
        >
            <span class="fa fa-plus-circle"></span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "year.vue",
        props: {
            year: {
                default:  2019,
                type: Number,
                required: true
            }
        },
        data: function () {
            return {
                currentYear: this.year
            }
        },
        methods: {
            increaseYear: function (){
                this.currentYear++;
                this.$emit("update-year", this.currentYear);
            },
            decreaseYear: function (){
                this.currentYear--;
                this.$emit("update-year", this.currentYear);
            }
        }
    }
</script>

<style scoped>
    .year-label {
        font-size: 140%;
    }
</style>