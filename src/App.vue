<template>

    <transition name="fade">

        <div v-if="$root.isInitializing === true">
            Initializing Application...
        </div>

        <div v-else-if="$root.isInitializing === 'retry'">
            Application not responding... Retrying...
        </div>

        <div v-else-if="$root.isAuthenticating">
            Authenticating...
        </div>

        <component :is="layout" v-else>
            <transition name="fade">
                <router-view/>
            </transition>
        </component>

    </transition>

</template>

<script>

    export default {

        name: 'App',

        computed: {

            layout() {

                let layout = this.$route.meta.layout || 'default';

                return `layout-${layout}` || 'layout-default';

            }

        }

    }
</script>
