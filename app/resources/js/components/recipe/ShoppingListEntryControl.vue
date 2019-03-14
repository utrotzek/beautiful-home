<template>
    <div
        class="shoppingListEntryCreator"
        @keydown.esc="cancel"
    >
        <div class="row">
            <div class="col-9 col-md-10 ">
                <div class="row">
                    <div class="col-4 col-md-2 pr-0">
                        <label
                            for="count"
                            class="sr-only"
                        >Anzahl</label>
                        <input
                            id="count"
                            v-model="currentCount"
                            v-focus
                            type="text"
                            class="form-control"
                            placeholder=""
                        >
                    </div>

                    <div class="col-8 col-md-3 pr-0 pl-1">
                        <label
                            for="unit"
                            class="sr-only"
                        >Einheit</label>
                        <AutoCompleter
                            id="unit"
                            placeholder="Einheit..."
                            search-key="title"
                            :preselected-value="currentUnit ? currentUnit.id : ''"
                            :items="allUnits"
                            :show-all-items-on-empty-query="true"
                            @create="createNewUnit"
                            @selected="unitChanged"
                        />
                    </div>

                    <div class="col-12 col-md-7 mt-1 mt-md-0 pr-0 pl-md-1">
                        <label
                            for="title"
                            class="sr-only"
                        >Name</label>
                        <AutoCompleter
                            id="title"
                            placeholder="Produkt auswählen..."
                            search-key="title"
                            :preselected-value="currentArticle ? currentArticle.id : ''"
                            :items="allArticles"
                            :show-all-items-on-empty-query="true"
                            :enable-inline-creation="true"
                            @create="createNewArticle"
                            @selected="articleChanged"
                        />
                    </div>
                </div>
            </div>
            <div class="col-3 col-md-2 m-md-0 p-md-0 pl-md-1">
                <div class="row m-0 p-0">
                    <div class="col-12 col-md-6">
                        <button
                            class="btn btn-primary"
                            @click="addEntry"
                            @keydown.enter="addEntry"
                        >
                            <i class="fas fa-save"></i>
                            <span class="sr-only">Hinzufügen</span>
                        </button>
                    </div>
                    <div class="col-12 col-md-6 pt-1 pt-md-0">
                        <button
                            class="btn btn-secondary"
                            @click="cancel"
                        >
                            <i class="fas fa-ban"></i>
                            <span class="sr-only">Abbrechen</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create new Article modal -->
        <div v-if="showNewArticleModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div
                            class="modal-dialog"
                            role="document"
                        >
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">
                                        Neuen Artikel '{{ newArticleName }}' anlegen
                                    </h5>
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span
                                            aria-hidden="true"
                                            @click="showNewArticleModal = false"
                                        >&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">
                                            <p>
                                                Bitte wählen Sie eine Warengruppe für den neuen Artikel aus.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <AutoCompleter
                                                :items="allGroups"
                                                placeholder="Bitte auswählen"
                                                search-key="title"
                                                :show-all-items-on-empty-query="true"
                                                @selected="changeNewArticleGroup"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        @click="toggleNewArticleModal"
                                    >
                                        <i class="fas fa-ban"></i>
                                        Abbrechen
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="saveNewArticle"
                                    >
                                        <i class="fas fa-plus-circle"></i>
                                        Artikel anlegen
                                    </button>
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
import UnitsData from "../../data/Units";
import ArticlesData from "../../data/Article";
import GroupData from "../../data/Groups";
import AutoCompleter from "../tools/Autocompleter";

export default {
    components: {
        AutoCompleter
    },
    props:{
        unit: {
            type: Object,
            require: true,
            default: null
        },
        article: {
            type: Object,
            require: true,
            default: null
        },
        count: {
            type: Number | String,
            require: true,
            default: ""
        }
    },
    data () {
        return {
            showNewArticleModal: false,
            newArticleName: "",
            newArticleGroup: null,
            allUnits: UnitsData,
            allGroups: GroupData,
            allArticles: ArticlesData,
            currentCount: this.count,
            currentUnit: this.unit,
            currentArticle: this.article
        };
    },
    methods: {
        changeNewArticleGroup(articleGroup){
            this.newArticleGroup = articleGroup;
        },
        toggleNewArticleModal() {
            this.showNewArticleModal = !this.showNewArticleModal;
        },
        saveNewArticle() {
            //CITEQ_TODO: save to api
            this.currentArticle = {
                title: this.newArticleName,
                group: this.newArticleGroup
            };

            this.addEntry();
            this.toggleNewArticleModal();
        },
        createNewArticle(newArticleName){
            this.toggleNewArticleModal();
            this.newArticleName = newArticleName;
        },
        createNewUnit(){
            this.showNewArticleModal = true;
        },
        addEntry() {
            let newItem = {
                article: this.currentArticle,
                unit: this.currentUnit,
                count: this.currentCount
            };

            newItem = JSON.parse(JSON.stringify(newItem));
            this.$emit("selected", newItem);
        },
        cancel(){
            this.$emit("cancel");
        },
        unitChanged(newUnit) {
            this.currentUnit = newUnit;
        },
        articleChanged(newArticle){
            this.currentArticle = newArticle;
        }
    }
};
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