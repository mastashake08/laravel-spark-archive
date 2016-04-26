Vue.component('spark-settings-security-password-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        //
    },


    /*
     * Initial state of the component's data.
     */
    data: function () {
        return {
            user: null,

            updatePasswordForm: {
                old_password: '',
                password: '',
                password_confirmation: '',
                errors: [],
                updating: false,
                updated: false
            }
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;
        }
    },


    methods: {
        /**
         * Update the user's password.
         */
        updatePassword: function (e) {
            e.preventDefault();

            this.updatePasswordForm.errors = [];
            this.updatePasswordForm.updated = false;
            this.updatePasswordForm.updating = true;

            this.$http.put('/settings/user/password', this.updatePasswordForm)
                .success(function () {
                    this.updatePasswordForm.updated = true;
                    this.updatePasswordForm.updating = false;

                    this.updatePasswordForm.old_password = '';
                    this.updatePasswordForm.password = '';
                    this.updatePasswordForm.password_confirmation = '';
                })
                .error(function (errors) {
                    Spark.setErrorsOnForm(this.updatePasswordForm, errors);
                    this.updatePasswordForm.updating = false;
                });
        }
    }
});
