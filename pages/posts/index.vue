<template>
    <div>

        <display-all-posts/>
    </div>
</template>

<script>
    import DisplayAllPosts from '~/components/DisplayAllPosts'
    export default {
        name: "Posts",
        mounted() {

        },

        components: {
            DisplayAllPosts
        }
    }
</script>