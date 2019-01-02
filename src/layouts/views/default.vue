<template>

    <div class="layout-splash layout-container">

        <transition name="fade">
            <router-view/>
        </transition>

    </div>

</template>

<script>

    export default {

        name: 'layout-default'

    }

</script>
