<template>
    <div class="modal-wrapper">
        <Progressbar
            ref="modalProgress"
            color="#f8f9fa"
        />
        <transition
            v-if="show"
            name="modal"
        >
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div
                        class="modal-dialog"
                        role="document"
                    >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">
                                    Template auswählen
                                </h3>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    @click="close"
                                >
                                    <span
                                        aria-hidden="true"
                                    >&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Wählen Sie eine Vorlage aus. Die Daten werden anschließend in den aktuellen Monat übernommen.</p>
                                <ul class="list-group">
                                    <li
                                        v-for="item in templates"
                                        :key="item.id"
                                        class="list-group-item template-entry"
                                        @click="selectTemplate(item)"
                                    >
                                        {{ item.title }} ({{ item.plannings.length }} Einträge)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "TemplateSelector",
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            templates: []
        };
    },
    watch: {
        /* istanbul ignore next */
        show(value) {
            /* istanbul ignore next */
            if (value){
                /* istanbul ignore next */
                this.loadTemplates();
            }
        }
    },
    methods: {
        close () {
            this.$emit("close");
        },
        async loadTemplates(){
            this.$refs.modalProgress.start();
            await window.axios.get("/api/finance/template")
                .then(res => {
                    this.templates = res.data;
                    this.$refs.modalProgress.done();
                });
        },
        selectTemplate(selectedTemplate){
            this.$emit("templateSelected", selectedTemplate);
            this.$emit("close");
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

    .template-entry {
        cursor: pointer;
    }
</style>

