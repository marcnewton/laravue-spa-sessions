<template>

    <div class="">

        <div>

            <div class="logo"></div>

            <template v-if="$root.isInitializing === true">
                Initializing... Please Wait...
            </template>

            <template v-else-if="$root.isInitializing === 'offline'">
                Services appear to be unavailable...
                <button @click="$laravel.initialize">Retry</button>
            </template>

            <template v-else-if="$root.isAuthenticating">
                Authenticating user...
            </template>

        </div>

    </div>

</template>

<script>

    export default {

        name: 'layout-initializing'

    }

</script>
