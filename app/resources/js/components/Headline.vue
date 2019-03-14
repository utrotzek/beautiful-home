<template>
    <div class="row text-center">
        <div class="col">
            <h1>{{ text }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "Headline undefined"
        }

    }
};
</script>