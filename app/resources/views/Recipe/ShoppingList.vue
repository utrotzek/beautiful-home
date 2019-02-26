<template>
    <div>
        <Headline text="Einkaufsliste"></Headline>

        <div class="row">
            <div
                    v-for="(group,index) in groupedShoppingList"
                    class="col-md-4"
                    :key="group.id"
            >
                <h5>{{ index }}</h5>

                <ul class="list-group">
                    <ShoppingListEntry
                            v-for="shoppingListItem in group"
                            class="list-group-item"
                            :shoppingListItem="shoppingListItem">
                            :key="shoppingListItem.id"
                    </ShoppingListEntry>
                </ul>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <h5>Eintrag hinzufügen</h5>
                <ShoppingListEntryCreator></ShoppingListEntryCreator>
            </div>
        </div>
    </div>
</template>

<script>
    import ShoppingListData from '../../js/data/ShoppingList'

    import ShoppingListEntry from '../../js/components/recipe/ShoppingListEntry'
    import ShoppingListEntryCreator from '../../js/components/recipe/ShoppingListEntryCreator'
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
            ShoppingListEntry,
            ShoppingListEntryCreator
        }

    }
</script>