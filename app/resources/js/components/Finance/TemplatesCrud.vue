<template>
    <div class="template-crud">
        <div
            v-if="templates.length > 0"
            class="list-group"
        >
            <div
                v-for="template in templates"
                :key="template.id"
                class="list-group-item list-group-item-action template-item entry"
                @click="editTemplate(template)"
            >
                {{ template.title }}

                <span class="edit-controls float-right">
                    <button
                        title="Vorlage löschen"
                        class="delete"
                        @click="deleteTemplate(template)"
                        @click.stop
                    >
                        <i class="fa fa-trash-alt"></i>
                    </button>
                </span>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-info">
                Noch keine Vorlagen vorhanden.
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                <div
                    v-if="!$v.newTemplateName.minLength"
                    class="text-danger"
                >
                    Der Name muss mindestens 6 Zeichen beinhalten.
                </div>
                <div
                    v-else-if="!$v.newTemplateName.isUnique"
                    class="text-danger"
                >
                    Der Name ist bereits vergeben.
                </div>
                <div
                    v-else
                    class="text-danger"
                >
                    <!-- placeholder -->
                    &nbsp;
                </div>
                <div class="form-inline">
                    <div class="form-group mx-sm-1 mb-2">
                        <label class="sr-only">Name</label>
                        <input
                            v-model="$v.newTemplateName.$model"
                            class="form-control template-name"
                            :class="errorClass($v.newTemplateName)"
                            placeholder="Name"
                            type="text"
                            name="template-name"
                        >
                    </div>
                    <button
                        class="btn btn-primary mb-2 submit"
                        :disabled="$v.$anyError"
                        @click="createTemplate"
                    >
                        Vorlage anlegen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
    name: "TemplatesCrudVue",
    props: {
        templates: {
            type: Array,
            required: true,
            default() {
                return [
                    {
                        id: 1,
                        title: "Standard"
                    },
                    {
                        id: 2,
                        title: "Januar mit Versicherungen"
                    }
                ];
            }
        }
    },
    data() {
        return {
            localTemplates: this.templates,
            newTemplateName: ""
        };
    },
    validations: {
        newTemplateName: {
            required,
            minLength: minLength(6),
            isUnique(value) {
                const foundDuplicates = this.templates.filter((item) => {return item.title === value;});
                return foundDuplicates.length === 0;
            }
        }
    },
    methods: {
        errorClass(validator) {
            return {
                "is-invalid": validator.$error
            };
        },
        editTemplate(template){
            this.$emit("editTemplate", template);
        },
        deleteTemplate(template){
            this.$emit("deleteTemplate", template);
        },
        createTemplate() {
            this.$v.$touch();

            if  (!this.$v.$invalid){
                this.$emit("createTemplate", this.newTemplateName);
                //reset input field
                this.newTemplateName = "";
            }
        }
    }
};
</script>

<style scoped>
    .edit-controls button {
        background-color: transparent;
        border:none;
    }

    .template-item {
        cursor: pointer;
    }

    .form-inline input:not(.is-invalid),
    .form-inline input:not(.is-valid) {
        padding-right: calc(1.5em + 0.75rem);
    }
</style>
