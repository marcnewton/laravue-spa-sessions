<template>

    <transition name="fade">
        <component :is="layout"/>
    </transition>

</template>

<script>

    export default {

        name: 'App',
        computed: {

            meta() {
                return this.$router.currentRoute.meta;
            },

            layout() {

                if (this.$root.isInitializing || this.$root.isAuthenticating)
                    return 'layout-initializing';

                if (this.$root.inMaintenance)
                    return 'layout-maintenance';

                let layout = this.meta.layout || 'default';

                if (this.meta.hasOwnProperty('noAuth') && this.meta.noAuth)
                    return `layout-${layout}`;

                if (this.$root.isAuthenticated === false)
                    return 'layout-login';

                return `layout-${layout}`;

            }

        }

    }
</script>
