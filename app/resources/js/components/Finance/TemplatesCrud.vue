<template>
    <div class="template-crud">
        <div
            v-for="template in templates"
            :key="template.id"
            class="row mb-2 entry"
        >
            <div class="col-6 title">
                {{ template.title }}
            </div>
            <div class="col-6 edit-controls">
                <button
                    title="Vorlage bearbeiten"
                    class="edit"
                    @click="editTemplate(template)"
                >
                    <i class="fa fa-edit"></i>
                </button>
                <button
                    title="Vorlage löschen"
                    class="delete"
                    @click="deleteTemplate(template)"
                >
                    <i class="fa fa-trash-alt"></i>
                </button>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <div class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
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
            minLength: minLength(6)
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
</style>
