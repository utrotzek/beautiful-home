<template>
    <div class="autoCompleter">
        <div
                class="form-control"
                @focus="toggleEditMode()"
                tabindex="0"
                v-text="selectedItem ? selectedItem[searchKey] : placeholder"
        >
        </div>

        <div v-if="editMode" class="input">
            <!--suppress JSUndeclaredVariable -->
            <input
                    class="form-control"
                    type="text"
                    @keydown.up="keyUp"
                    @keydown.down="keyDown"
                    @keydown.enter="selectItem"
                    @keydown.esc="toggleEditMode"
                    @change='evt=>query=evt.target.value'
                    v-model="query"
                    v-focus>
            <div class="result">
                <ul ref="resultList">
                    <li
                            ref="resultListItem"
                        v-for="(item, index) in matchedItems"
                        :key="item[searchKey]"
                        :class="{'selected': (selected === index)}"
                        v-text="item[searchKey]"
                        @click="itemClicked(index)"
                    ></li>
                    <li class="notSelectable" v-if="emptySearchResult">Keinen Artikel gefunden</li>
                </ul>
            </div>
            <div class="newItem" v-if="emptySearchResult">
                <button
                        class="btn btn-secondary"
                        @click="createItem"
                >
                    Neuen Artikel "{{ query }}" anlegen
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String
            },
            items: {
                type: Array,
                required: true
            },
            searchKey: {
                type: String,
                required: true
            },
            queryShouldBeReset: {
                type: Boolean,
                default: true
            },
            showAllItemsOnEmptyQuery: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                selected: 0,
                selectedItem: null,
                editMode: false,
                emptySearchResult: false,
                query: ''
            }
        },
        methods: {
            toggleEditMode() {
                this.resetQuery();
                this.editMode = !this.editMode
            },
            itemClicked(index) {
                this.selected = index;
                this.selectItem();
            },
            selectItem() {
                this.selectedItem = this.matchedItems[this.selected];
                this.editMode = false;
                this.resetQuery();

                this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)));
            },
            resetQuery() {
                if (this.queryShouldBeReset){
                    this.query = '';
                }
            },
            keyUp(){
                if (this.selected === 0){
                    return;
                }

                this.selected -=1;
                this.scrollToItem();
            },
            keyDown(){
                if (this.selected >= this.matchedItems.length -1){
                    return;
                }

                this.selected +=1;
                this.scrollToItem();
            },
            scrollToItem(){
                let itemHeight = this.$refs.resultListItem[0].offsetHeight;
                this.$refs.resultList.scrollTop = this.selected * itemHeight;
            },
            createItem() {
                this.$emit('create', this.query);
                this.resetQuery();
                this.emptySearchResult=false;
                this.toggleEditMode();
            }
        },
        computed: {
            matchedItems() {
                let filteredItems = [];

                this.$emit('change', this.query);

                if (this.query === ''){
                    if (this.showAllItemsOnEmptyQuery){
                        return this.items;
                    }else{
                        return filteredItems;
                    }
                }

                filteredItems= this.items.filter(
                    (item) =>
                        //find items which matches the current query string
                        item[this.searchKey].toLowerCase().includes(this.query.toLowerCase())
                    );

                this.emptySearchResult = (filteredItems.length === 0);
                return filteredItems;
            }
        }
    }
</script>

<style scoped>
    .input {
        border: solid lightgrey 1px;
        z-index: 100;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        width: 33rem;
        background-color: white;
        margin-top: 2rem;
    }

    .result ul {
        list-style: none;
        padding: 0;
        margin: 0;
        overflow-y: scroll;
        min-height: 50px;
        max-height: 150px;
        z-index: 100;
    }

    .result ul li.notSelectable {
        cursor: default;
        font-style: italic;
        font-size: 80%;
    }

    .result ul li.notSelectable:hover {
        background-color: #e2e2e2;
        color:black;
    }

    .result ul li {
        border: solid 1px #f7f6f9;
        cursor: pointer;
        background-color: #e2e2e2;
        padding: 10px;
    }

    .result ul li:hover {
        background-color: #a5a4a4;
        color:white;
    }

    .result ul li.selected {
        background-color: #a5a4a4;
        color:white;
    }
</style>