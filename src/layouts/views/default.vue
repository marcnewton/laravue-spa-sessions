<template>

    <div class="layout-header">

        <header>

            <div class="logo"></div>

            <div class="spacer"></div>

            <button @click="authLogin">Logout</button>

        </header>

        <transition mode="out-in">
            <router-view/>
        </transition>

    </div>

</template>

<script>

    export default {

        name: 'layout-default'

    }

</script>
