<template>

    <div class="layout-splash layout-container">

        <transition name="fade" mode="out-in">

            <v-input-form :action="$laravel.login" :input="input" v-if="screen === 'login'">

                <div class="logo"></div>

                <label for="input-email">{{ $trans('auth.email') }}</label>
                <input v-model="input.email" type="email" id="input-email" autocomplete="current-username" class="full-width"/>

                <label for="input-password">{{ $trans('auth.password') }}</label>
                <input v-model="input.password" type="password" id="input-password" autocomplete="current-password" class="full-width"/>

                <div class="checkbox">
                    <input v-model="input.remember" type="checkbox" id="input-remember"/>
                    <label for="input-remember">{{ $trans('auth.remember') }}</label>
                </div>

                <div class="flex spaced full-width">
                    <button type="button" :disabled="$root.isAuthenticating" @click.prevent="screen = 'recover'">{{ $trans('auth.forgotten') }}</button>
                    <button type="submit" :disabled="$root.isAuthenticating">{{ $trans('auth.login') }}</button>
                </div>

            </v-input-form>

            <v-input-form :action="$laravel.recover" :input="input" v-else>

                <div class="logo"></div>

                <label for="input-recovery-email">{{ $trans('auth.email') }}</label>
                <input v-model="input.email" type="email" id="input-recovery-email" autocomplete="current-username" class="full-width"/>

                <div class="flex spaced full-width">
                    <button type="button" :disabled="$root.isAuthenticating" @click.prevent="screen = 'login'">{{ $trans('common.cancel') }}</button>
                    <button type="submit" :disabled="$root.isAuthenticating">{{ $trans('passwords.request') }}</button>
                </div>

            </v-input-form>

        </transition>

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

            },

            screen: 'login'

        })

    }

</script>
