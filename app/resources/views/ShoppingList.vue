<template>
    <div>
        <Headline text="Einkaufsliste" />
        <div class="d-none d-print-block mt-2">
&nbsp;
        </div>
        <div class="row">
            <p
                v-if="shoppingList.length === 0"
                class="col text-center"
            >
                Es befinden sich keine Einträge auf der Einkaufsliste!
            </p>
            <div
                v-for="(group,index) in groupedShoppingList"
                v-else
                :key="group.id"
                class="col-md-6 mt-1"
            >
                <h5>{{ index }}</h5>

                <ul class="list-group">
                    <ShoppingListEntry
                        v-for="(shoppingListItem) in group"
                        :key="shoppingListItem.id"
                        class="list-group-item"
                        :shopping-list-item="shoppingListItem"
                        @update="updateEntry(shoppingListItem.id, $event)"
                    />
                </ul>
            </div>
        </div>
        <div class="row d-flex justify-content-md-center mt-3 d-print-none">
            <div class="col-md-3 col-sm-12">
                <button
                    v-if="!addMode"
                    class="btn btn-primary btn-block"
                    @click="toggleAddMode"
                >
                    <i class="fas fa-plus-circle"></i>
                    Eintrag hinzufügen
                </button>
            </div>
        </div>
        <div
            v-if="addMode"
            class="row d-flex justify-content-md-center d-print-none"
        >
            <div class="col-md-4 col-sm-12">
                <h2>Eintrag hinzufügen</h2>
                <ShoppingListEntryControl
                    :enable-inline-creation="true"
                    @selected="addNewItem"
                    @cancel="toggleAddMode"
                />
            </div>
        </div>
        <hr class="d-print-none">
        <div class="row mt-4 d-flex justify-content-center d-print-none">
            <div class="col-sm-12 col-md-6">
                <div
                    class="btn-group d-flex"
                    role="group"
                    aria-label="Basic example"
                >
                    <button
                        class="btn btn-primary"
                        :disabled="unchanged"
                    >
                        <i class="fas fa-save"></i>
                        <span class="d-none d-md-inline">Speichern</span>
                    </button>
                    <button
                        class="btn btn-secondary ml-1"
                        :disabled="unchanged"
                        @click="cancel"
                    >
                        <i class="fas fa-ban"></i>
                        <span class="d-none d-md-inline">Abbrechen</span>
                    </button>
                    <button
                        v-if="!mobileDevice"
                        class="btn btn-secondary ml-1"
                        @click="print()"
                    >
                        <i class="fas fa-print"></i>
                        <span class="d-none d-md-inline">Drucken</span>
                    </button>
                    <button
                        class="btn btn-secondary ml-1"
                        @click="deleteShoppingList"
                    >
                        <i class="fas fa-trash-alt"></i>
                        <span class="d-none d-md-inline">Alle Einträge löschen</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ShoppingListData from "../js/data/ShoppingList";

import ShoppingListEntry from "../js/components/recipe/ShoppingListEntry";
import ShoppingListEntryControl from "../js/components/recipe/ShoppingListEntryControl";
export default {
    components: {
        ShoppingListEntry,
        ShoppingListEntryControl
    },
    data () {
        return {
            shoppingList: ShoppingListData,
            originalShoppingList: null,
            groups: [],
            addMode: false,
            unchanged: true,
            canceled: false,
            cleared: false,
        };
    },
    computed: {
        groupedShoppingList () {
            
            return _.groupBy(this.shoppingList, "item.article.group.title");
        },
        mobileDevice() {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
        }
    },
    watch: {
        "shoppingList": {
            deep: true,
            handler (){
                if (!this.canceled && !this.cleared){
                    this.unchanged = false;
                }
                this.canceled = false;
                this.cleared = false;
            }
        }
    },
    methods: {
        toggleAddMode() {
            this.addMode = !this.addMode;
        },
        addNewItem(article) {
            this.toggleAddMode();

            this.cacheShoppingList();

            //CITEQ_TODO: add to api and use real ID
            this.shoppingList.push({
                id: Math.random(),
                item: article
            });
        },
        updateEntry(updatedId, article){
            this.cacheShoppingList();

            for (let i = 0; i < this.shoppingList.length; i++){
                if (this.shoppingList[i].id === updatedId){
                    this.shoppingList[i].item = article;
                }
            }
        },

        print(){
            window.print();
        },
        deleteShoppingList() {
            this.shoppingList = [];
            this.cleared = true;
        },
        cancel(){
            this.shoppingList =  this.originalShoppingList;
            this.originalShoppingList = null;
            this.unchanged = true;
            this.canceled = true;
        },
        cacheShoppingList(){
            if (this.originalShoppingList === null){
                this.originalShoppingList = JSON.parse(JSON.stringify(this.shoppingList));
            }
        }
    }

};
</script>