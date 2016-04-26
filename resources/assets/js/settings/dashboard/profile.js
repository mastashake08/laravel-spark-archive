Vue.component('spark-settings-profile-screen', {
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

            updateProfileForm: {
                name: '',
                email: '',
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

            this.updateProfileForm.name = user.name;
            this.updateProfileForm.email = user.email;
        }
    },


    methods: {
        /**
         * Update the user's profile information.
         */
        updateProfile: function (e) {
            e.preventDefault();

            this.updateProfileForm.errors = [];
            this.updateProfileForm.updated = false;
            this.updateProfileForm.updating = true;

            this.$http.put('/settings/user', this.updateProfileForm)
                .success(function (user) {
                    this.user = user;

                    this.$dispatch('updateUser');

                    this.updateProfileForm.updated = true;
                    this.updateProfileForm.updating = false;
                })
                .error(function (errors) {
                    Spark.setErrorsOnForm(this.updateProfileForm, errors);
                    this.updateProfileForm.updating = false;
                });
        }
    }
});
