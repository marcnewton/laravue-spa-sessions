<template>

    <div class="layout-splash layout-container">

        <div>

            <div class="logo"></div>

            <div v-if="$root.isInitializing === true">
                Initializing... Please Wait...
            </div>

            <div v-if="$root.isInitializing === 'offline'">
                Services appear to be unavailable...
                <button @click="$Laravel.initialize">Retry</button>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        name: 'layout-initializing'

    }

</script>
