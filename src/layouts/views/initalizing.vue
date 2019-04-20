<template>

    <div class="layout-splash layout-container">

        <div>

            <div class="logo"></div>

            <template v-if="isInitializing === true">
                Initializing... Please Wait...
            </template>

            <template v-if="isInitializing === 'offline'">
                Services appear to be unavailable...
                <button @click="$Laravel.initialize">Retry</button>
            </template>

        </div>

    </div>

</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'layout-initializing',

        computed: {

            ...mapState(['isInitializing']),

        }

    }

</script>
