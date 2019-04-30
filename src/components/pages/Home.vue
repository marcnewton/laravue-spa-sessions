<template>

    <main class="page-home flex column center middle">
        <h4>Welcome back {{ user.name }}</h4>
        <div class="logo"></div>

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
