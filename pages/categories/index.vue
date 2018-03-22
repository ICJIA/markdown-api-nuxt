<template>
    <div>

        <display-content taxonomy="categories" />
    </div>
</template>

<script>
    import DisplayContent from '~/components/DisplayContent'
    export default {
        name: "Posts",
        mounted() {

        },

        components: {
            DisplayContent
        }
    }
</script>