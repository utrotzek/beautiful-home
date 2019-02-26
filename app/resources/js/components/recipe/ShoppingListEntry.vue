<template>
    <li class="shoppingItem">
        <!-- count inline edit -->
        <button
            class="btn btn-link"
            @keyup.enter = "activateEditMode"
            @click = "activateEditMode"
            v-if="!editMode"
        >
            <i class="fas fa-edit"></i>
        </button>

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
            {{shoppingListItem.item.title}}
        </span>

        <button
                v-if="editMode"
                @click="deactivateEditMode()"
                class="btn btn-secondary small btn-sm">
            OK
        </button>
    </li>
</template>
<script>
    import Units from '../../../js/data/Units';
    export default {
        props: {
            shoppingListItem: {
                type: Object,
                require: true
            }
        },
        data () {
            return {
                editMode: false,
                selectedUnit: 0,
                allUnits: Units,
                //workaround to prevent infinite watch loop
                unitReallyChanged: false
            }
        },
        mounted () {
            this.selectedUnit = this.shoppingListItem.item.unit.id;
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        methods: {
            activateEditMode() {
                this.editMode = true;
                this.$emit = 'editModeActivated';
            },
            deactivateEditMode() {
                this.editMode = false;
                this.$emit = 'editModeDeactivated';
            }
        },
        watch: {
            selectedUnit: {
                handler: function (newUnit, oldUnit) {
                    if (newUnit !== oldUnit){
                        for (let i=0; i < this.allUnits.length; i++){
                            if (this.allUnits[i].id === newUnit){
                                this.shoppingListItem.item.unit = this.allUnits[i];
                                this.unitReallyChanged = false;
                                return;
                            }
                        }
                    }
                },
                deep: true
            }
        },
    }
</script>