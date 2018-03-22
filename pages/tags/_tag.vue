<template>
    <div>

        {{taggedPosts}}



    </div>
</template>

<script>



    export default {
        head() {
            return {

            }
        },
        mounted() {

        },
        fetch({ store, params }) {
            store.dispatch('getTaggedPosts', params.tag)

        },
        computed: {
            taggedPosts() {
                return this.$store.state.taggedPosts
            }
        }
    }
</script>

<style>
</style>