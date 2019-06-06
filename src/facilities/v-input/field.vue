<template>

    <div class="v-input">
        <div class="error" v-if="error">
            <span v-for="message in errorMessages" :key="message">{{ message }}</span>
        </div>
        <label>{{ label }}</label>
        <input v-model="value" :name="name" :placeholder="placeholder" :autocomplete="autocomplete" :disabled="disabled" :readonly="readonly" :class="classNames" />
    </div>

</template>

<script>

    import { Properties } from './mixins/inputCommon';

    export default {

        name: 'v-input-field',

        mixins: [ Properties ]

    }


</script>
