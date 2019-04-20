<template>

    <main>
        <h1>Hello {{ user.name }}</h1>
    </main>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {

        name: 'page-home',

        computed: {

            ...mapGetters(['user']),

        }
    }

</script>
