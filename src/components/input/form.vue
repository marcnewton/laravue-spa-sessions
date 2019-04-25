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
            },

            input: {
                type: Object,
                default: () => ({})
            }

        },

        data: () => ({

            message: '',
            errors: {}

        }),

        methods: {

            submit() {

                return this.action(this.input).then(response => {

                    const redirect = this.$router.currentRoute.query.hasOwnProperty('redirect') && this.$router.currentRoute.query.redirect
                        ? this.$router.currentRoute.query.redirect : this.$router.currentRoute.path;

                    this.$router.push(redirect);

                }, error => {

                    console.error('error',error);

                    // if(error.hasOwnProperty('response') === false) {
                    //     console.error(error);
                    //     return;
                    // }
                    //
                    // if(error.response.hasOwnProperty('data') === false) {
                    //     console.error(error.response);
                    // }
                    //
                    // if(error.response.data.hasOwnProperty('message'))
                    //     this.$set(this,'message',error.response.data.message);
                    //
                    // if(error.response.data.hasOwnProperty('errors'))
                    //     this.$set(this,'errors',error.response.data.errors);
                    //
                    // this.$emit('error',error);


                });

            }
        }
    }

</script>
