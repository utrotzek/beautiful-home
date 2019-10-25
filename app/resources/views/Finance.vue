<template>
    <div>
        <Headline text="Finanzen verwalten" />
        <div class="main-content">
            <div class="row text-center">
                <div class="col">
                    <year :year="year" @update-year="updateYear"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import YearComponent from '../js/components/financial/year';    
    
export default {
    components: {
        year: YearComponent
    },
    mounted() {
        this.year = new Date().getFullYear();
    },
    data: function(){
        return {
            year: 2020
        };
    },
    methods: {
        updateYear(newYear) {
            this.year = newYear
        }
    }
};
</script>