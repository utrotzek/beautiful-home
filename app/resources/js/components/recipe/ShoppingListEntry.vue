<template>
    <li class="shoppingItem">
        <!-- count inline edit -->
        <button
            v-if="!editMode"
            class="btn btn-link d-print-none"
            @click="toggleEditMode"
        >
            <i class="fas fa-edit"></i>
        </button>

        <div
            v-if="!editMode"
            class="preview d-inline"
        >
            <span>
                {{ shoppingListItem.item.count }}
            </span>

            <!-- unit inline edit -->
            <span>{{ shoppingListItem.item.unit.abbreviation }}</span>
            <span>{{ shoppingListItem.item.article.title }}</span>
        </div>

        <div
            v-if="editMode"
            class="editor d-inline"
        >
            <ShoppingListItemControl
                :article="shoppingListItem.item.article"
                :count="shoppingListItem.item.count"
                :unit="shoppingListItem.item.unit"
                @selected="updateItem"
                @cancel="toggleEditMode"
            />
        </div>
    </li>
</template>
<script>
import ShoppingListItemControl from "./ShoppingListEntryControl";

export default {
    components: {
        ShoppingListItemControl
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus();
            }
        }
    },
    props: {
        shoppingListItem: {
            type: Object,
            require: true,
            default: null
        }
    },
    data () {
        return {
            editMode: false,
        };
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        updateItem(updatedItem) {
            this.toggleEditMode();
            let entry = JSON.parse(JSON.stringify(updatedItem));
            this.$emit("update", entry);
        }
    }
};
</script>