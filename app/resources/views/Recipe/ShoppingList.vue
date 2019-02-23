<template>
    <div>
        <Headline text="Einkaufsliste"></Headline>

        <div class="row">
            <div v-for="(group,index) in groupedIngredients" class="col-md-4">
                <h5>{{ index }}</h5>

                <ul class="list-group">
                    <li v-for="ingredient in group" class="list-group-item">
                        {{ingredient.ingredient.count + 'x ' + ingredient.ingredient.unit.abbreviation + ' ' + ingredient.ingredient.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                ingredientsList: [
                    {
                        count: 1,
                        ingredient: {
                            id: 1,
                            title: "Mehl",
                            group: {
                                id: 1,
                                title: 'Getreideprodukte'
                            },
                            unit: {
                                id: 1,
                                title: 'Messerspitze',
                                abbreviation: 'Msp.'
                            },
                            count: 1.5
                        }
                    },
                    {
                        count: 1,
                        ingredient: {
                            id: 1,
                            title: "Passierte Tomaten",
                            group: {
                                id: 3,
                                title: 'Tomatenprodukte'
                            },
                            unit: {
                                id: 1,
                                title: 'Gramm',
                                abbreviation: 'g'
                            },
                            count: 500
                        },
                    },
                    {
                        count: 1,
                        ingredient: {
                            id: 1,
                            title: "Grieß",
                            group: {
                                id: 1,
                                title: 'Getreideprodukte'
                            },
                            unit: {
                                id: 1,
                                title: 'Esslöffel',
                                abbreviation: 'EL '
                            },
                            count: 1.5
                        }
                    }
                ],
                groups: []
            }
        },
        computed: {
            groupedIngredients () {
                return _.groupBy(this.ingredientsList, 'ingredient.group.title')
            }
        },
        mounted() {
            this.refreshGroupList()
        },
        watch: {
            'ingredientsList' () {
                this.refreshGroupList()
            }
        },
        methods: {
            containsGroup: function(groupId) {
                let length = this.groups.length;
                for(let i = 0; i < length; i++) {
                    if(this.groups[i].id === groupId) return true;
                }
                return false;
            },
            refreshGroupList() {
                for (let i=0;  i < this.ingredientsList.length; i++){
                    let groupObject = this.ingredientsList[i].ingredient.group;
                    if (!this.containsGroup(groupObject.id)){
                        this.groups.push(groupObject)
                    }
                }
            }
        }
    }
</script>