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

        disabled: {
            type: Boolean,
            default: false
        },

        autocomplete: {
            type: String,
            default: ''
        },

        classes: {
            type: String,
            default: 'bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
        },

        loading: {
            type: Boolean,
            default: false
        },
    },

    data: () => ({

        error: false,
        errorMessages: []

    }),

    computed: {

        classNames: {

            get() {

                return [

                    this.classes,

                    {
                        'focus:outline-0 focus:shadow-outline': ! this.error,
                        'border-red-500 bg-red-500 text-white outline-none': this.error,
                    }

                ]

            }

        }

    }

};

export {Properties};
