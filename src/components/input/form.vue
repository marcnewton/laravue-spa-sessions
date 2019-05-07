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

                    if(error.hasOwnProperty('response') === false) {
                        console.error(error);
                        return;
                    }

                    if(error.response.hasOwnProperty('data') === false) {
                        console.error(error.response);
                    }

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
