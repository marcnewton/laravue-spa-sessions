<template>

    <div class="layout-header">

        <header>

            <div class="logo"></div>

            <div class="spacer"></div>

            <button class="" @click="$Laravel.logout">Logout</button>

        </header>

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
