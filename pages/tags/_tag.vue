<template>
    <div>

        <h1 class="list">Posts tagged with: '{{$route.params.tag}}'</h1>
        JSON: {{taggedPosts}}


    </div>
</template>

<script>

    export default {
        name: "getPostsByTag",
        mounted() {

        },
        fetch({ store, params }) {
            store.dispatch('getPostsByTag', params.tag)

        },
        computed: {
            taggedPosts() {
                return this.$store.state.postsByTag
            }
        }
    }
</script>

<style>
    .list {
        margin-bottom: 30px;
    }
</style>