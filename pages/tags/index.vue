<template>
    <div>
        {{tags}}


    </div>
</template>

<script>

    export default {
        name: "tags",
        mounted() {

        },
        fetch({ store, params }) {
            store.dispatch('getTags')

        },
        computed: {
            tags() {
                return this.$store.state.tags
            }
        }
    }
</script>

<style>
    .list {
        margin-bottom: 30px;
    }
</style>