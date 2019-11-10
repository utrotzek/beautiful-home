<template>
    <div
        role="group"
        aria-label="Basic example"
        class="btn-group d-flex"
    >

        <button
            v-if="showConnect"
            type="button"
            class="btn btn-light"
            @click.stop
            @click="connect"
        >
            <i class="fas fa-link"></i> <span class="d-none d-sm-inline">Zuordnen</span>
        </button>

        <button
            v-if="showEdit"
            type="button"
            class="btn btn-light"
            @click.stop
            @click="edit"
        >
            <i class="fas fa-edit"></i> <span class="d-none d-sm-inline">Bearbeiten</span>
        </button>

        <button
            v-if="showDelete"
            type="button"
            class="btn btn-light"
            @click.stop
            @click="deleteClick"
        >
            <i class="fas fa-trash"></i> <span class="d-none d-sm-inline">Löschen</span>
        </button>

        <button
            v-if="showClose"
            type="button"
            class="btn btn-light"
            @click.stop
            @click="close"
        >
            <i class="fas fa-ban"></i> <span class="d-none d-sm-inline">Schließen</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "ButtonRowVue",

    props: {
        showEdit: {
            type: Boolean,
            default: false
        },
        showDelete: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        },
        showConnect: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        edit() {
            this.$emit("edit");
        },
        deleteClick() {
            this.$emit("deleteClick");
        },
        close() {
            this.$emit("close");
        },
        connect() {
            this.$emit("connect");
        }
    }
};
</script>

<style scoped>

</style>
