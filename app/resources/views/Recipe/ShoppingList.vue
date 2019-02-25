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
        <div class="row mt-4">
            <div class="col">
                <h5>Eintrag hinzufügen</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import ShoppingListData from '../../js/data/ShoppingList'

    import ShoppingLisEntry from '../../js/components/recipe/ShoppingListEntry'
    export default {
        data () {
            return {
                shoppingList: ShoppingListData,
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