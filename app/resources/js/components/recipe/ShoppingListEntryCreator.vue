<template>
    <div class="shoppingListEntryCreator" @keydown.esc="cancel">
        <div class="row">
            <div class="col-9 col-md-10 ">
                <div class="row">
                    <div class="col-4 col-md-2 pr-0">
                        <label for="count" class="sr-only">Anzahl</label>
                        <input
                                type="text"
                                class="form-control"
                                id="count"
                                placeholder=""
                                v-model="count"
                                v-focus>
                    </div>

                    <div class="col-8 col-md-3 pr-0 pl-1">
                        <label for="unit" class="sr-only">Einheit</label>
                        <AutoCompleter
                                id="unit"
                                placeholder="Einheit..."
                                search-key="title"
                                :items="allUnits"
                                :show-all-items-on-empty-query="true"
                                @selected="unitChanged"
                        ></AutoCompleter>
                    </div>

                    <div class="col-12 col-md-7 mt-1 mt-md-0 pr-0 pl-md-1">
                        <label for="title" class="sr-only">Name</label>
                        <AutoCompleter
                                id="title"
                                placeholder="Produkt auswählen..."
                                search-key="title"
                                :items="allArticles"
                                @create="createNewItem"
                                :show-all-items-on-empty-query="true"
                                @selected="articleChanged"
                        ></AutoCompleter>
                    </div>
                </div>
            </div>
            <div class="col-3 col-md-2 m-md-0 p-md-0 pl-md-1">
                <div class="row m-0 p-0">
                    <div class="col-12 col-md-6">
                        <button class="btn btn-primary" @click="addEntry" @keydown.enter="addEntry">
                            <i class="fas fa-plus"></i>
                            <span class="sr-only">Hinzufügen</span>
                        </button>
                    </div>
                    <div class="col-12 col-md-6 pt-1 pt-md-0">
                        <button class="btn btn-secondary" @click="cancel">
                            <i class="fas fa-ban"></i>
                            <span class="sr-only">Abbrechen</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create new Article modal -->
        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Neuen Artikel '{{ newArticleName }}' anlegen</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>
                                        Bitte wählen Sie eine Warengruppe für den neuen Artikel aus.
                                    </p>
                                    <AutoCompleter
                                            :items="allGroups"
                                            placeholder="Bitte auswählen"
                                            search-key="title"
                                            show-all-items-on-empty-query="true"
                                    >
                                    </AutoCompleter>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
    import UnitsData from '../../data/Units'
    import ArticlesData from '../../data/Article'
    import GroupData from '../../data/Groups'
    import AutoCompleter from '../tools/Autocompleter'

    export default {
        data () {
            return {
                showModal: false,
                newArticleName: '',
                selectedUnit: null,
                selectedArticle: null,
                count: '',
                allUnits: UnitsData,
                allGroups: GroupData,
                allArticles: ArticlesData
            }
        },
        methods: {
            createNewItem(itemName){
                this.showModal = true;
                this.newArticleName = itemName;
            },
            addEntry() {
                let newItem = {
                    article: this.selectedArticle,
                    unit: this.selectedUnit,
                    count: this.count
                };

                newItem = JSON.parse(JSON.stringify(newItem));
                this.$emit('selected', newItem);
            },
            cancel(){
                this.$emit('cancel');
            },
            unitChanged(newUnit) {
                this.selectedUnit = newUnit;
            },
            articleChanged(newArticle){
                this.selectedArticle = newArticle;
            }
        },
        components: {
            AutoCompleter
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
</style>