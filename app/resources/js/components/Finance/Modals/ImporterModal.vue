<template>
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
                                Sparkassen Datei importieren
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
                            <div
                                v-if="step===1"
                                class="step1"
                            >
                                <h4>Datei auswählen</h4>
                                <p>
                                    Hier können Sie eine Datei .cvs Datei importieren. Bitte beachten Sie, dass die Datei folgenden Aufbau haben muss.
                                </p>
                                <ul>
                                    <li>Mit Semikolon getrennt</li>
                                    <li>
                                        Muss folgende Felder enthalten
                                        <ul>
                                            <li>Buchungstag</li>
                                            <li>Buchungstext</li>
                                            <li>Beguenstigter/Zahlungspflichtiger</li>
                                        </ul>
                                    </li>
                                </ul>
                                <form>
                                    <div class="custom-file">
                                        <input
                                            id="customFile"
                                            type="file"
                                            class="custom-file-input"
                                            @change="onFileSelect"
                                        >
                                        <label
                                            v-if="file.data"
                                            class="custom-file-label"
                                            for="customFile"
                                        >
                                            {{ file.name }} ({{ file.size | toFileSize }})
                                        </label>
                                        <label
                                            v-else
                                            class="custom-file-label"
                                            for="customFile"
                                        >
                                            Wählen Sie die gewünschte Datei
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div
                                v-if="step===2"
                                class="step2"
                            >
                                <h4>Vorschau</h4>
                                <div v-if="accountingImport.length > 0">
                                    <p>
                                        Folgende Daten werden dem aktuellen Monat hinzugefügt.
                                    </p>
                                    <div class="sticky-head">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Datum</th>
                                                    <th>Title</th>
                                                    <th>Betrag</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="item in accountingImport"
                                                    :key="item.id"
                                                >
                                                    <td>{{ item.date | formatDate }}</td>
                                                    <td>{{ item.title }}</td>
                                                    <td>{{ item.totalAmount | toCurrency }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p>
                                        Bitte klicken Sie auf "Daten importieren"
                                    </p>
                                </div>
                                <div v-else>
                                    <div
                                        class="alert alert-info"
                                        role="alert"
                                    >
                                        Die Datei enthält keine Daten oder Daten die bereits importiert wurden.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-danger abort-button"
                                @click="close"
                            >
                                <i class="fas fa-ban"></i>
                                Abbrechen
                            </button>
                            <button
                                v-if="step===2"
                                type="button"
                                class="btn btn-light back"
                                @click="back"
                            >
                                <i class="fas fa-arrow-alt-circle-left"></i>
                                Zurück
                            </button>
                            <button
                                v-if="step===1"
                                type="button"
                                class="btn btn-primary upload"
                                :disabled="file.data === ''"
                                @click="upload"
                            >
                                <i class="fas fa-eye"></i>
                                Vorschau anzeigen
                            </button>
                            <button
                                v-if="step===2"
                                type="button"
                                class="btn btn-primary start-import"
                                :disabled="accountingImport.length === 0"
                                @click="startImport"
                            >
                                <i class="fas fa-save"></i>
                                Daten importieren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ImportModal",
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        period: {
            type: Object,
            required: true,
            default: null
        }
    },
    data() {
        return {
            step: 1,
            file: {
                data: "",
                name: "",
                extension: "",
                size: 0
            },
            accountingImport: null
        };
    },
    methods: {
        close () {
            this.step = 1;
            this.accountingImport = null;
            this.file = {
                data: "",
                name: "",
                extension: "",
                size: 0
            };
            this.$emit("close");
        },
        back () {
            this.step--;
        },
        upload() {
            /* istanbul ignore next */
            if (this.file.data !== ""){
                const data = {
                    period: this.period,
                    preview: true,
                    file: this.file.data
                };
                this.$emit("loading");
                window.axios.post("/api/finance/accounting/import", data)
                    .then(res => {
                        this.accountingImport = res.data;
                        this.step++;
                        this.$emit("loadingCompleted");
                    });
            }
        },
        onFileSelect(e) {
            /* istanbul ignore next */
            let files = e.target.files || e.dataTransfer.files;
            /* istanbul ignore next */
            if (!files.length)
                return;
            this.chooseFile(files[0]);
        },
        chooseFile(file) {
            let reader = new FileReader();
            let vm = this;
            /* istanbul ignore next */
            reader.onload = (e) => {
                vm.file.data = e.target.result;
                vm.file.name = e.target.name;
                vm.file.size = e.target.size;
                vm.file.extension = vm.file.name.split(".").pop();
            };
            reader.name = file.name;
            reader.size = file.size;
            reader.readAsDataURL(file);
        },
        startImport() {
            /* istanbul ignore next */
            if (this.file.data !== "") {
                const data = {
                    period: this.period,
                    preview: false,
                    file: this.file.data
                };
                this.$emit("loading");
                window.axios.post("/api/finance/accounting/import", data)
                    .then(() => {
                        this.$emit("dataImported");
                        this.$emit("loadingCompleted");
                        this.close();
                    });
            }
        },
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

    .abort-button {
        margin-right: auto;
    }

    .sticky-head          { overflow-y: auto; height: 20rem; }
    .sticky-head thead th { position: sticky; top: -1px; }

    /* Just common table stuff. Really. */
    table  { border-collapse: collapse; width: 100%; }
    th, td { padding: 8px 16px; }
    th     { background:#eee; }
</style>
