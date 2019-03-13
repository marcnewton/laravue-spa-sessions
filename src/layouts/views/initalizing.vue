<template>

    <div class="layout-splash layout-container">

        <div>

            <div class="logo"></div>

            <template v-if="$root.isInitializing === true">
                Initializing... Please Wait...
            </template>

            <template v-if="$root.isInitializing === 'offline'">
                Services appear to be unavailable...
                <button @click="$Laravel.initialize">Retry</button>
            </template>

        </div>

    </div>

</template>

<script>

    export default {

        name: 'layout-initializing'

    }

</script>
