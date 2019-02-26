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
            <span>
                {{shoppingListItem.item.count}}
            </span>

            <!-- unit inline edit -->
            <span>{{shoppingListItem.item.unit.abbreviation}}</span>
            <span>{{shoppingListItem.item.article.title}}</span>
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