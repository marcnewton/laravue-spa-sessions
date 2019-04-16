<template>

    <div>
        <div class="logo"></div>
        <h1>Hello {{ user.name }}</h1>
    </div>

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
