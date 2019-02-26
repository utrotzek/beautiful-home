<template>
    <div class="shoppingListEntryCreator">
        <div class="row">
            <div class="col-9 col-md-11 ">
                <div class="row">
                    <div class="col-4 col-md-1 pr-0">
                        <label for="count" class="sr-only">Anzahl</label>
                        <input type="text" class="form-control" id="count" placeholder="" v-model="shoppingListEntry.count" v-focus>
                    </div>

                    <div class="col-8 col-md-3 pr-0 pl-1">
                        <label for="unit" class="sr-only">Einheit</label>
                        <select
                                id="unit"
                                title="Einheit auswählen"
                                class="form-control"
                                v-model="selectedUnit"
                        >
                            <option v-for="unit in allUnits" v-bind:value="unit.id">
                                {{unit.abbreviation + ' (' + unit.title + ')'}}
                            </option>
                        </select>
                    </div>

                    <div class="col-12 col-md-8 mt-1 mt-md-0 pr-0 pl-md-1">
                        <label for="title" class="sr-only">Name</label>
                        <AutoCompleter
                                id="title"
                                placeholder="Produkt auswählen..."
                                search-key="title"
                                :items="allArticles"
                                @create="createNewItem"
                        ></AutoCompleter>
                    </div>
                </div>
            </div>
            <div class="col-3 col-md-1 m-md-0 p-md-0 pl-md-1">
                <button type="submit" class="btn btn-primary" @click="addEntry">
                    <i class="fas fa-plus"></i>
                    <span class="sr-only">Hinzufügen</span>
                </button>
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
                selectedUnit: 1,
                newArticleName: '',
                shoppingListEntry: {
                    item: {
                        title: "Mehl",
                        group: {
                            id: 1,
                            title: 'Getreideprodukte'
                        },
                        unit: {
                            id: 1,
                            title: 'Messerspitze',
                            abbreviation: 'Msp.'
                        }
                    }
                },
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
                this.$emit('addEntry', this.shoppingListEntry);
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