<template>
    <div>
        <Headline text="Einkaufsliste"></Headline>
        <div class="d-none d-print-block mt-2">&nbsp;</div>
        <div class="row">
            <p class="col text-center" v-if="shoppingList.length === 0">Es befinden sich keine Einträge auf der Einkaufsliste!</p>
            <div
                    v-else
                    v-for="(group,index) in groupedShoppingList"
                    class="col-md-6 mt-1"
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
        <div class="row d-flex justify-content-md-center mt-3 d-print-none">
            <div class="col-md-3 col-sm-12">
                <button class="btn btn-primary btn-block" @click="toggleAddMode" v-if="!addMode">
                    <i class="fas fa-plus-circle"></i>
                    Eintrag hinzufügen
                </button>
            </div>
        </div>
        <div class="row d-flex justify-content-md-center d-print-none" v-if="addMode">
            <div class="col-md-4 col-sm-12">
                <h2>Eintrag hinzufügen</h2>
                <ShoppingListEntryControl
                        @selected="addNewItem"
                        @cancel="toggleAddMode"
                        :enable-inline-creation="true">
                </ShoppingListEntryControl>
            </div>
        </div>
        <hr class="d-print-none" />
        <div class="row mt-4 d-flex justify-content-center d-print-none">
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
                    <button class="btn btn-secondary ml-1" @click="print()" v-if="!mobileDevice">
                        <i class="fas fa-print"></i>
                        <span class="d-none d-md-inline">Drucken</span>
                    </button>
                    <button class="btn btn-secondary ml-1" @click="deleteShoppingList">
                        <i class="fas fa-trash-alt"></i>
                        <span class="d-none d-md-inline">Alle Einträge löschen</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ShoppingListData from '../js/data/ShoppingList'

    import ShoppingListEntry from '../js/components/recipe/ShoppingListEntry'
    import ShoppingListEntryControl from '../js/components/recipe/ShoppingListEntryControl'
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
                return _.groupBy(this.shoppingList, 'item.article.group.title')
            },
            mobileDevice() {
                return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
            }
        },
        components: {
            ShoppingListEntry,
            ShoppingListEntryControl
        },
        methods: {
            toggleAddMode() {
                this.addMode = !this.addMode;
            },
            addNewItem(article) {
                this.toggleAddMode();

                //CITEQ_TODO: add to api and use real ID
                this.shoppingList.push({
                    id: Math.random(),
                    item: article
                });
            },
            print(){
                window.print();
            },
            deleteShoppingList() {
                this.shoppingList = [];
            }
        }

    }
</script>