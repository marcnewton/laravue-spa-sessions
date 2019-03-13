<template>

    <transition name="fade">
        <div class="form-errors" v-if="hasErrors">

            <div>{{ message }}</div>

            <ul v-for="messages in errors">
                <li v-for="message in messages">{{ message }}</li>
            </ul>

        </div>
    </transition>

</template>

<script>

    export default {

        name: 'v-input-errors',

        props: {

            message: {
                type: String,
                default: () => ('')
            },

            errors: {
                type: Object,
                default: () => ({})
            }

        },

        computed: {

            hasErrors() {

                return Object.keys(this.errors).length > 0;

            }

        }

    }

</script>
