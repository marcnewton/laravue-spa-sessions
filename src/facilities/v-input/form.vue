<template>

    <form @submit.prevent="submit">
        <slot/>
    </form>

</template>

<script>

    export default {

        name: 'v-input-form',

        props: {

            action: {
                type: Function,
                default: function () {
                    this.$emit('submit');
                }
            },

            input: {
                type: Object,
                default: () => ({})
            }

        },

        methods: {

            submit() {

                let form = this;

                form.$emit('loading', true);

                form.action(this.input).then(response => {

                    form.$emit('success',response);

                }, error => {

                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);

                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }

                    console.log(error.config);

                    if(error.response.data.hasOwnProperty('message'))
                        this.$notify(error.response.data.message,'error');

                    //if(error.response.data.hasOwnProperty('errors'))



                    form.$emit('error',error);

                }).finally(() => {

                    form.$emit('loading', false);

                });

            }
        }
    }

</script>
