<template>
    <div>

        <display-all-posts/>
    </div>
</template>

<script>
    import DisplayAllPosts from '~/components/DisplayAllPosts'
    export default {
        name: "posts",
        mounted() {

        },

        components: {
            DisplayAllPosts
        }
    }
</script>