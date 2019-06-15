<template>

    <div class="min-h-screen flex justify-center items-center layout-auth">

        <notification-app></notification-app>

        <div>
            <div class="logo"></div>
        </div>

        <transition mode="out-in">

            <v-input-form v-if="screen === 'login'" :action="authLogin" :input="input" @loading="setLoading">

                <v-input-field v-model="input.email" name="email" :label="trans('auth.email')" autocomplete="current-username"></v-input-field>

                <v-input-field v-model="input.password" name="password" :label="trans('auth.password')" autocomplete="current-password"></v-input-field>

                <div class="checkbox">
                    <input v-model="input.remember" type="checkbox" id="input-remember"/>
                    <label for="input-remember">{{ trans('auth.remember') }}</label>
                </div>

                <div class="flex spaced full-width">
                    <button type="button" :disabled="loading" @click.prevent="screen = 'request'">{{
                        trans('auth.forgotten') }}
                    </button>
                    <button type="submit" :disabled="loading">{{ trans('auth.login') }}</button>
                </div>

            </v-input-form>

            <v-input-form v-else :action="authRecover" :input="input" @success="success" @loading="setLoading">

                <label for="input-recovery-email">{{ trans('auth.email') }}</label>
                <input v-model="input.email" type="email" id="input-recovery-email" autocomplete="current-username"
                       class="full-width"/>

                <div class="flex spaced full-width">
                    <button type="button" :disabled="loading" @click.prevent="screen = 'login'">{{
                        trans('common.cancel') }}
                    </button>
                    <button type="submit" :disabled="loading">{{ trans('passwords.request') }}</button>
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

            screen: 'login',

            loading: false

        }),

        methods: {

            setLoading(val) {

                this.loading = val;

            },

            success(response) {

                this.screen = 'login';

                if (response.data.hasOwnProperty('message')) {
                    this.$notify(response.data.message);
                }

            }

        }

    }

</script>
