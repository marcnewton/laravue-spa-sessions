import CKEditor from '@ckeditor/ckeditor5-vue';

export default {

    install: (Vue, options = {}) => {

        Vue.use( CKEditor );

    }

}
