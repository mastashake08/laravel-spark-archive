/*
 * Load Vue & Vue-Resource.
 *
 * Vue is the JavaScript framework used by Spark.
 */
window.Vue = require('vue');

require('vue-resource');
Vue.http.headers.common['X-CSRF-TOKEN'] = Spark.csrfToken;

/*
 * Load Underscore.js, used for map / reduce on arrays.
 */
window._ = require('underscore');

/*
 * Load Moment.js, used for date formatting and presentation.
 */
window.moment = require('moment');

/*
 * Load jQuery and Bootstrap jQuery, used for front-end interaction.
 */
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');

