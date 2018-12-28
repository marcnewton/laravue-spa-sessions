<template>

    <div class="layout-container">

        <h1>Vue Default Layout</h1>
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
