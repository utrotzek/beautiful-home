<template>
    <div>
        <Headline text="Einkaufsliste"></Headline>

        <div class="row">
            <div v-for="(group,index) in groupedShoppingList" class="col-md-4">
                <h5>{{ index }}</h5>

                <ul class="list-group">
                    <ShoppingLisEntry v-for="shoppingListItem in group" class="list-group-item" :shoppingListItem="shoppingListItem"></ShoppingLisEntry>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ShoppingLisEntry from '../../js/components/recipe/ShoppingListEntry'
    export default {
        data () {
            return {
                shoppingList: [
                    {
                        id: 1,
                        count: 1,
                        item: {
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
                        id: 2,
                        count: 1,
                        item: {
                            id: 1,
                            title: "Passierte Tomaten",
                            group: {
                                id: 3,
                                title: 'Tomatenprodukte'
                            },
                            unit: {
                                id: 2,
                                title: 'Gramm',
                                abbreviation: 'g'
                            },
                            count: 500
                        }
                    },
                    {
                        id: 3,
                        count: 1,
                        item: {
                            id: 1,
                            title: "Grieß",
                            group: {
                                id: 1,
                                title: 'Getreideprodukte'
                            },
                            unit: {
                                id: 3,
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
            groupedShoppingList () {
                return _.groupBy(this.shoppingList, 'item.group.title')
            }
        },
        components: {
            ShoppingLisEntry
        }

    }
</script>