<template>

    <form @submit.prevent="logMeIn">

        <div class="logo"></div>

        <label for="input-auth-email">{{ $trans('auth.email') }}</label>
        <input v-model="input.email" type="email" id="input-auth-email" autocomplete="current-username" />

        <label for="input-auth-password">{{ $trans('auth.password') }}</label>
        <input v-model="input.password" type="password" id="input-auth-password" autocomplete="current-password" />

        <label for="input-auth-remember">{{ $trans('auth.remember') }}</label>
        <input v-model="input.remember" type="checkbox" id="input-auth-remember"/>

        <button type="submit" :disabled="$root.isAuthenticating">Login</button>


        <div>{{ message }}</div>
        <div>{{ errors }}</div>

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

                message: '',
                errors: []

            }

        },

        methods: {

            logMeIn() {

                let vm = this;

                this.$Laravel.login(this.input).catch(error => {

                    console.log('login error comp',error.response.data);

                    if(error.response.data.hasOwnProperty('message'))
                        this.$set(this,'message',error.response.data.message);

                    if(error.response.data.hasOwnProperty('errors'))
                        this.$set(this,'errors',error.response.data.errors);

                });

            }

        }

    }

</script>
