<template>
    <div>

        <display-by-category display="list" />
    </div>
</template>

<script>
    import DisplayByCategory from '~/components/DisplayByCategory'
    export default {
        name: "Posts",
        mounted() {

        },

        components: {
            DisplayByCategory
        }
    }
</script>