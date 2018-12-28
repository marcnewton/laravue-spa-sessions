<template>

    <div class="layout-container">

        <div v-if="$root.isAuthenticating === true">
            Authenticating... Please Wait...
        </div>

        <div v-if="$root.isAuthenticating === 'failed'">
            Authentication Failed...
        </div>

    </div>

</template>

<script>

    export default {

        name: 'layout-authenticating'

    }

</script>
