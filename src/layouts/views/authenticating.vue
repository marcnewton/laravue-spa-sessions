<template>

    <div class="layout-splash layout-container">

        <div>

            <div class="logo"></div>

            <div v-if="$root.isAuthenticating === true">
                Authenticating... Please Wait...
            </div>

            <div v-if="$root.isAuthenticating === 'failed'">
                Authentication Failed...
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        name: 'layout-authenticating'

    }

</script>
