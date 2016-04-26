Vue.component('spark-settings-security-two-factor-screen', {
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

            twoFactorForm: {
                country_code: '',
                phone_number: '',
                errors: [],
                enabling: false,
                enabled: false
            },

            disableTwoFactorForm: {
                disabling: false,
            }
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            this.twoFactorForm.country_code = this.user.phone_country_code;
            this.twoFactorForm.phone_number = this.user.phone_number;
        }
    },


    methods: {
        /**
         * Enable two-factor authentication for the user.
         */
        enableTwoFactorAuth: function (e) {
            e.preventDefault();

            this.twoFactorForm.errors = [];
            this.twoFactorForm.enabling = true;
            this.twoFactorForm.enabled = false;

            this.$http.post('/settings/user/two-factor', this.twoFactorForm)
                .success(function (user) {
                    this.user = user;

                    this.$dispatch('updateUser');

                    this.twoFactorForm.enabled = true;
                    this.twoFactorForm.enabling = false;
                })
                .error(function (errors) {
                    this.twoFactorForm.errors = errors;
                    this.twoFactorForm.enabling = false;
                });
        },


        /**
         * Disable two-factor authentication for the user.
         */
        disableTwoFactorAuth: function (e) {
            e.preventDefault();

            this.twoFactorForm.enabled = false;
            this.disableTwoFactorForm.disabling = true;

            this.$http.delete('/settings/user/two-factor')
                .success(function (user) {
                    this.user = user;

                    this.$dispatch('updateUser');

                    this.disableTwoFactorForm.disabling = false;
                });
        }
    }
});
