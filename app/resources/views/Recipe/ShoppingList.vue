<template>
    <div>
        <Headline text="Einkaufsliste"></Headline>
        <div class="row">
            <div
                    v-for="(group,index) in groupedShoppingList"
                    class="col-md-6"
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
        <div class="row d-flex justify-content-md-center mt-3">
            <div class="col-md-3 col-sm-12">
                <button class="btn btn-primary btn-block" @click="toggleAddMode" v-if="!addMode">
                    <i class="fas fa-plus-circle"></i>
                    Eintrag hinzufügen
                </button>
            </div>
        </div>
        <div class="row d-flex justify-content-md-center" v-if="addMode">
            <div class="col-md-4 col-sm-12">
                <h5>Eintrag hinzufügen</h5>
                <ShoppingListEntryCreator @addEntry="addNewItem"></ShoppingListEntryCreator>
            </div>
        </div>
        <hr />
        <div class="row mt-4 d-flex justify-content-center">
            <div class="col-sm-12 col-md-6">
                <div class="btn-group d-flex" role="group" aria-label="Basic example">
                    <button class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        <span class="d-none d-md-inline">Speichern</span>
                    </button>
                    <button class="btn btn-secondary ml-1">
                        <i class="fas fa-ban"></i>
                        <span class="d-none d-md-inline">Abbrechen</span>
                    </button>
                    <button class="btn btn-secondary ml-1">
                        <i class="fas fa-print"></i>
                        <span class="d-none d-md-inline">Drucken</span>
                    </button>
                    <button class="btn btn-secondary ml-1">
                        <i class="fas fa-trash-alt"></i>
                        <span class="d-none d-md-inline">Alle Einträge löschen</span>
                    </button>
                </div>
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
                groups: [],
                addMode: false
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
        },
        methods: {
            toggleAddMode() {
                this.addMode = !this.addMode;
            },
            addNewItem() {
                this.toggleAddMode();
            }
        }

    }
</script>