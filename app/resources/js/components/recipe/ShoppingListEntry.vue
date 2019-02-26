<template>
    <li class="shoppingItem">
        <!-- count inline edit -->
        <button
            class="btn btn-link d-print-none"
            @click = "toggleEditMode"
            v-if="!editMode"
        >
            <i class="fas fa-edit"></i>
        </button>

        <div class="preview d-inline" v-if="!editMode">
            <!-- count edit -->
            <label :for="'countEdit' + shoppingListItem.id" class="sr-only">Anzahl</label>
            <input
                    :id="'countEdit' + shoppingListItem.id"
                    class="small countInput"
                    title="Anzahl bearbeiten"
                    v-if="editMode"
                    v-model="shoppingListItem.item.count"
                    @keyup.enter="deactivateEditMode"
                    v-focus/>
            <span v-else>
            {{shoppingListItem.item.count}}
        </span>

            <!-- unit inline edit -->
            <select
                    v-model="selectedUnit"
                    v-if="editMode"
                    title="Einheit auswählen"
            >
                <option v-for="unit in allUnits" v-bind:value="unit.id">
                    {{unit.title + ' (' + unit.abbreviation + ')'}}
                </option>
            </select>
            <span v-else>{{shoppingListItem.item.unit.abbreviation}}</span>

            <label class="sr-only" :for="'titleEdit' + shoppingListItem.id">Name</label>
            <input
                    :id="'titleEdit' + shoppingListItem.id"
                    title="Titel bearbeiten"
                    v-if="editMode"
                    type="text"
                    class="small"
                    @keyup.enter="deactivateEditMode"
                    v-model="shoppingListItem.item.title"
            />
            <span v-else>
            {{shoppingListItem.item.article.title}}
        </span>

            <button
                    v-if="editMode"
                    @click="deactivateEditMode()"
                    class="btn btn-secondary small btn-sm">
                OK
            </button>
        </div>

        <div class="editor d-inline" v-if="editMode">
            <ShoppingListItemControl
                    :article="shoppingListItem.item.article"
                    :count="shoppingListItem.item.count"
                    :unit="shoppingListItem.item.unit"
                    @selected="updateItem"
                    @cancel="toggleEditMode"
            >
            </ShoppingListItemControl>
        </div>
    </li>
</template>
<script>
    import Units from '../../../js/data/Units';
    import ShoppingListItemControl from './ShoppingListEntryControl';

    export default {
        components: {
            ShoppingListItemControl
        },
        props: {
            shoppingListItem: {
                type: Object,
                require: true
            }
        },
        data () {
            return {
                editMode: false,
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        methods: {
            toggleEditMode() {
                this.editMode = !this.editMode;
            },
            updateItem(updatedItem) {
                this.shoppingListItem.item = updatedItem;
                this.toggleEditMode();
                console.log(updatedItem);
            }
        }
    }
</script>