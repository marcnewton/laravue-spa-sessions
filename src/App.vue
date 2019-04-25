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

                let meta = this.$router.currentRoute.meta;
console.log('meta',meta, (meta.hasOwnProperty('noAuth') && meta.noAuth), (meta.hasOwnProperty('requireAuth') && meta.requireAuth === true),  this.isAuthenticated === false);
                if( ( (meta.hasOwnProperty('noAuth') && meta.noAuth) === false || (meta.hasOwnProperty('requireAuth') && meta.requireAuth) === true ) && this.isAuthenticated === false )
                    return 'layout-login';
console.log('dynamic layout');
                let layout = meta.layout || 'default';
console.log('specified layout', layout);
                return `layout-${layout}`;

            }

        }

    }
</script>
