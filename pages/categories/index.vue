<template>
    <div>
        {{categories}}


    </div>
</template>

<script>

    export default {
        name: "categories",
        mounted() {

        },
        fetch({ store, params }) {
            store.dispatch('getCategories')

        },
        computed: {
            categories() {
                return this.$store.state.categories
            }
        }
    }
</script>