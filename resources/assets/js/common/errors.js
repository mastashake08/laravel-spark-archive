/*
 * Common Error Display Component.
 */
Vue.component('spark-errors', {
    props: ['form'],

    template: "<div><div class='alert alert-danger' v-if='form.errors.length > 0'>\
                <strong>Whoops!</strong> There were some problems with your input.<br><br>\
                <ul>\
                    <li v-repeat='error : form.errors'>\
                        {{ error }}\
                    </li>\
                </ul>\
            </div></div>"
});
