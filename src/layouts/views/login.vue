<template>

    <div class="layout-splash layout-container">

        <v-input-form :action="$Laravel.login" :input="input">

            <div class="logo"></div>

            <label for="input-email">{{ $trans('auth.email') }}</label>
            <input v-model="input.email" type="email" id="input-email" autocomplete="current-username" />

            <label for="input-password">{{ $trans('auth.password') }}</label>
            <input v-model="input.password" type="password" id="input-password" autocomplete="current-password" />

            <label for="input-remember">{{ $trans('auth.remember') }}</label>
            <input v-model="input.remember" type="checkbox" id="input-remember"/>

            <button type="submit" :disabled="$root.isAuthenticating">Login</button>

        </v-input-form>

    </div>

</template>

<script>

    export default {

        name: 'layout-login',

        data: () => ({

            input: {

                email: '',
                password: '',
                remember: ''

            }

        })

    }

</script>
