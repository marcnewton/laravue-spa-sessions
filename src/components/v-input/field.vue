<template>

    <div class="v-input">
        <label>{{ label }}</label>
        <input v-model="value" :name="name" :placeholder="placeholder" :class="classes" />
    </div>

</template>

<script>

    import { Properties } from './mixins/inputCommon';

    export default {

        name: 'v-input-field',

        mixins: [ Properties ]

    }


</script>
