const Properties = {

    props: {

        value: {
            type: [String, Number],
            default: ''
        },

        name: {
            type: String,
            default: ''
        },

        label: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: ''
        },

        readonly: {
            type: Boolean,
            default: false
        },

        autocomplete: {
            type: String,
            default: ''
        },

        classes: {
            type: String,
            default: 'bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
        }
    }

};

export {Properties};
