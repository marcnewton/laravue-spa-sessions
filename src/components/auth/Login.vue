<template>

    <form>

        <label for="input-auth-email">{{ $trans('auth.email') }}</label>
        <input v-model="input.email" type="email" id="input-auth-email" />

        <label for="input-auth-password">{{ $trans('auth.password') }}</label>
        <input v-model="input.password" type="password" id="input-auth-password" />

        <label for="input-auth-remember">{{ $trans('auth.remember') }}</label>
        <input v-model="input.remember" type="checkbox" id="input-auth-remember"/>

        <button @click="logMeIn">Login</button>

        {{ errors }}

    </form>

</template>

<script>

    export default {

        name: 'auth-login',

        data() {

            return {

                input: {

                    email: '',
                    password: '',
                    remember: ''

                },

                errors: []

            }

        },

        methods: {

            logMeIn() {

                this.$Laravel.login(this.input).catch(error => {

                    this.errors = error.response.data.errors;

                });

            }

        }

    }

</script>
