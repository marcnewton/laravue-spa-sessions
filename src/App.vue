<template>

    <transition name="fade">
        <component :is="layout"/>
    </transition>

</template>

<script>

    export default {

        name: 'App',
        computed: {

            layout() {

                if(this.$root.isInitializing)
                    return 'layout-initializing';

                if(this.$root.isAuthenticating)
                    return 'layout-authenticating';

                let layout = this.$route.meta.layout || 'default';

                return `layout-${layout}` || 'layout-default';

            }

        }

    }
</script>
