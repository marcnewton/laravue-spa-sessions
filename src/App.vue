<template>

    <transition name="fade">
        <component :is="layout"/>
    </transition>

</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'App',
        computed: {

            ...mapState(['isInitializing','isAuthenticated','inMaintenance']),

            layout() {

                if(this.isInitializing)
                    return 'layout-initializing';

                if(this.inMaintenance)
                    return 'layout-maintenance';

                if( ( this.$router.currentRoute.meta.hasOwnProperty('noAuth') === false || this.$router.currentRoute.meta.hasOwnProperty('requireAuth') === true ) && this.isAuthenticated === false)
                    return 'layout-login';

                let layout = this.$route.currentRoute.meta.layout || 'default';

                return `layout-${layout}`;

            }

        }

    }
</script>
