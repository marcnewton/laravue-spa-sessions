<template>

    <form @submit.prevent="submit">
        <slot/>
        <v-input-errors :message="message" :errors="errors" />
    </form>

</template>

<script>

    export default {

        name: 'v-input-form',

        props: {

            action: {
                type: Function,
                default: () => {
                    this.$emit('submit');
                }
            }

        },

        data: () => ({

            message: '',
            errors: {}

        }),

        methods: {

            submit() {

                this.action().catch(error => {

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
