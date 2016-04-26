var settingsSubscriptionScreenForms = {
    updateCard: function () {
        return {
            number: '', cvc: '', month: '', year: '', zip: '',
            errors: [], updating: false, updated: false
        };
    }
};

Vue.component('spark-settings-subscription-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        Stripe.setPublishableKey(STRIPE_KEY);

        this.getPlans();

        this.initializeTooltips();
    },


    /*
     * Configure watched data listeners.
     */
    watch: {
        'subscribeForm.plan': function (value, oldValue) {
            if (value.length > 0) {
                setTimeout(function () {
                    $('.spark-first-field').filter(':visible:first').focus();
                }, 250);
            } else {
                this.initializeTooltips();
            }
        }
    },

    /*
     * Initial state of the component's data.
     */
    data: function () {
        return {
            user: null,
            currentCoupon: null,

            plans: [],

            subscribeForm: {
                plan: '', terms: false, strip_token: null, errors: [], subscribing: false
            },

            cardForm: {
                number: '', cvc: '', month: '', year: '', zip: '', errors: []
            },

            changePlanForm: {
                plan: '', errors: [], changing: false
            },

            updateCardForm: settingsSubscriptionScreenForms.updateCard(),

            extraBillingInfoForm: {
                text: '', errors: [], updating: false, updated: false
            },

            resumeSubscriptionForm: { errors: [], resuming: false },

            cancelSubscriptionForm: { errors: [], cancelling: false }
        };
    },


    computed: {
        /*
         * Determine if the user has been loaded from the database.
         */
        userIsLoaded: function () {
            if (this.user) {
                return true;
            }

            return false;
        },


        /*
         * Determine if the user is currently on the "grace period".
         */
        userIsOnGracePeriod: function () {
            if (this.user.subscription_ends_at) {
                return moment().isBefore(this.user.subscription_ends_at);
            }

            return false;
        },


        /*
         * Determine the date that the user's grace period is over.
         */
        subscriptionEndsAt: function () {
            if (this.user.subscription_ends_at) {
                return moment(this.user.subscription_ends_at).format('MMMM Do');
            }
        },


        /*
         * Determine if the plans have been loaded from the database.
         */
        plansAreLoaded: function () {
            return this.plans.length > 0;
        },


        /*
         * This method is used to determine if we need to display both a
         * monthly and yearly plans column, or if we will just show a
         * single column of available plans for the user to choose.
         */
        includesBothPlanIntervals: function () {
            return this.plansAreLoaded && this.monthlyPlans.length > 0 && this.yearlyPlans.length > 0;
        },


        /*
         * Retrieve the plan that the user is currently subscribed to.
         */
        currentPlan: function () {
            var self = this;

            if ( ! this.userIsLoaded) {
                return null;
            }

            var plan = _.find(this.plans, function (plan) {
                return plan.id == self.user.stripe_plan;
            });

            if (plan !== 'undefined') {
                return plan;
            }
        },


        /*
         * Get the plan currently selected on the subscribe form.
         */
        selectedPlan: function () {
            var self = this;

            return _.find(this.plans, function (plan) {
                return plan.id == self.subscribeForm.plan;
            });
        },


        /*
         * Get the full selected plan price with currency symbol.
         */
        selectedPlanPrice: function () {
            if (this.selectedPlan) {
                return this.selectedPlan.currencySymbol + this.selectedPlan.price;
            }
        },


        /*
         * Get all of the plans that have a mnthly interval.
         */
        monthlyPlans: function() {
            return _.filter(this.plans, function(plan) {
                return plan.interval == 'monthly' && plan.active;
            });
        },


        /*
         * Get all of the plans that have a yearly interval.
         */
        yearlyPlans: function() {
            return _.filter(this.plans, function(plan) {
                return plan.interval == 'yearly' && plan.active;
            });
        },


        /*
         * Get all of the "default" available plans. Typically this is monthly.
         */
        defaultPlans: function () {
            if (this.monthlyPlans.length > 0) {
                return this.monthlyPlans;
            }

            if (this.yearlyPlans.length > 0) {
                return this.yearlyPlans;
            }
        },


        /*
         * Get all of the available plans except this user's current plan.
         * This'll typically be the monthly plans unless there are none.
         */
        defaultPlansExceptCurrent: function () {
            if (this.monthlyPlansExceptCurrent.length > 0) {
                return this.monthlyPlansExceptCurrent;
            }

            if (this.yearlyPlansExceptCurrent.length > 0) {
                return this.yearlyPlansExceptCurrent;
            }
        },


        /*
         * Get all of the monthly plans except the user's current plan.
         */
        monthlyPlansExceptCurrent: function() {
            var self = this;

            if ( ! this.currentPlan) {
                return [];
            }

            return _.filter(this.monthlyPlans, function (plan) {
                return plan.id != self.currentPlan.id;
            });
        },


        /*
         * Get all of the yearly plans except the user's current plan.
         */
        yearlyPlansExceptCurrent: function() {
            var self = this;

            if ( ! this.currentPlan) {
                return [];
            }

            return _.filter(this.yearlyPlans, function (plan) {
                return plan.id != self.currentPlan.id;
            });
        },


        /*
         * Get the expiratoin date for the current coupon in displayable form.
         */
        currentCouponDisplayDiscount: function () {
            if (this.currentCoupon) {
                if (this.currentCoupon.amountOff) {
                    return this.currentPlan.currencySymbol + this.currentCoupon.amountOff;
                }

                if (this.currentCoupon.percentOff) {
                    return this.currentCoupon.percentOff + '%';
                }
            }
        },


        /*
         * Get the expiratoin date for the current coupon in displayable form.
         */
        currentCouponDisplayExpiresOn: function () {
            return moment(this.currentCoupon.expiresOn).format('MMMM Do, YYYY');
        }
    },


    events: {
        /**
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            this.extraBillingInfoForm.text = this.user.extra_billing_info;

            if (this.user.stripe_id) {
                this.getCoupon();
            }
        }
    },


    methods: {
        /*
         * Get the coupon currently applying to the customer.
         */
        getCoupon: function () {
            this.$http.get('spark/api/subscriptions/user/coupon')
                .success(function (coupon) {
                    this.currentCoupon = coupon;
                })
                .error(function () {
                    //
                });
        },


        /*
         * Get all of the Spark plans from the API.
         */
        getPlans: function () {
            this.$http.get('spark/api/subscriptions/plans')
                .success(function (plans) {
                    this.plans = plans;
                });
        },


        /*
         * Subscribe the user to a new plan.
         */
        subscribe: function () {
            var self = this;

            this.subscribeForm.errors = [];
            this.subscribeForm.subscribing = true;

            /*
             * Here we will build the payload to send to Stripe, which will
             * return a token. This token can be used to make charges on
             *  the user's credit cards instead of storing the numbers.
             */
            var payload = {
                name: this.user.name,
                number: this.cardForm.number,
                cvc: this.cardForm.cvc,
                exp_month: this.cardForm.month,
                exp_year: this.cardForm.year,
                address_zip: this.cardForm.zip
            };

            Stripe.card.createToken(payload, function (status, response) {
                if (response.error) {
                    self.subscribeForm.errors.push(response.error.message);
                    self.subscribeForm.subscribing = false;
                } else {
                    self.subscribeForm.stripe_token = response.id;
                    self.sendSubscription();
                }
            });
        },


        /*
         * Subscribe the user to a new plan.
         */
        sendSubscription: function () {
            this.$http.post('settings/user/plan', this.subscribeForm)
                .success(function (user) {
                    this.user = user;
                    this.subscribeForm.subscribing = false;
                })
                .error(function (errors) {
                    Spark.setErrorsOnForm(this.subscribeForm, errors);
                    this.subscribeForm.subscribing = false;
                });
        },


        /*
         * Reset the subscription form plan to allow another plan to be selected.
         */
        selectAnotherPlan: function () {
            this.subscribeForm.plan = '';
        },


        /*
         * Show the modal screen to select another subscription plan.
         */
        confirmPlanChange: function() {
            this.changePlanForm.errors = [];
            this.changePlanForm.changing = false;

            $('#modal-change-plan').modal('show');

            this.initializeTooltips();
        },


        /*
         * Subscribe the user to another subscription plan.
         */
        changePlan: function() {
            this.changePlanForm.errors = [];
            this.changePlanForm.changing = true;

            this.$http.put('settings/user/plan', { plan: this.changePlanForm.plan })
                .success(function (user) {
                    this.user = user;

                    this.$dispatch('updateUser');

                    /*
                     * We need to re-initialize the tooltips on the screen because
                     * some of the plans may not have been displayed yet if the
                     * users just "switched" plans to another available plan.
                     */
                    $('#modal-change-plan').modal('hide');

                    this.initializeTooltips();

                    this.changePlanForm.changing = false;
                })
                .error(function (errors) {
                    this.changePlanForm.changing = false;
                    Spark.setErrorsOnForm(this.changePlanForm, errors);
                });
        },


        /*
         * Update the user's subscription billing card (Stripe portion).
         */
        updateCard: function (e) {
            var self = this;

            e.preventDefault();

            this.updateCardForm.errors = [];
            this.updateCardForm.updated = false;
            this.updateCardForm.updating = true;

            /*
             * Here we will build the payload to send to Stripe, which will
             * return a token. This token can be used to make charges on
             * the user's credit cards instead of storing the numbers.
             */
            var payload = {
                name: this.user.name,
                number: this.updateCardForm.number,
                cvc: this.updateCardForm.cvc,
                exp_month: this.updateCardForm.month,
                exp_year: this.updateCardForm.year,
                address_zip: this.updateCardForm.zip
            };

            Stripe.card.createToken(payload, function (status, response) {
                if (response.error) {
                    self.updateCardForm.errors.push(response.error.message);
                    self.updateCardForm.updating = false;
                } else {
                    self.updateCardUsingToken(response.id);
                }
            });
        },


        /*
         * Update the user's subscription billing card.
         */
        updateCardUsingToken: function (token) {
            this.$http.put('settings/user/card', { stripe_token: token })
                .success(function (user) {
                    this.user = user;

                    this.updateCardForm = settingsSubscriptionScreenForms.updateCard();
                    this.updateCardForm.updated = true;
                })
                .error(function (errors) {
                    this.updateCardForm.updating = false;
                    Spark.setErrorsOnForm(this.updateCardForm, errors);
                });
        },


        /*
         * Update the user's extra billing information.
         */
        updateExtraBillingInfo: function () {
            this.extraBillingInfoForm.errors = [];
            this.extraBillingInfoForm.updated = false;
            this.extraBillingInfoForm.updating = true;

            this.$http.put('settings/user/vat', this.extraBillingInfoForm)
                .success(function () {
                    this.extraBillingInfoForm.updated = true;
                    this.extraBillingInfoForm.updating = false;
                })
                .error(function (errors) {
                    Spark.setErrorsOnForm(this.extraBillingInfoForm, errors);
                    this.extraBillingInfoForm.updating = false;
                });
        },


        /*
         * Display the modal window to confirm subscription deletion.
         */
        confirmSubscriptionCancellation: function () {
            $('#modal-cancel-subscription').modal('show');
        },


        /*
         * Cancel the user's subscription with Stripe.
         */
        cancelSubscription: function () {
            this.cancelSubscriptionForm.errors = [];
            this.cancelSubscriptionForm.cancelling = true;

            this.$http.delete('settings/user/plan')
                .success(function (user) {
                    var self = this;

                    this.user = user;

                    $('#modal-cancel-subscription').modal('hide');

                    setTimeout(function () {
                        self.cancelSubscriptionForm.cancelling = false;
                    }, 500);
                })
                .error(function (errors) {
                    this.cancelSubscriptionForm.cancelling = false;
                    Spark.setErrorsOnForm(this.cancelSubscriptionForm, errors);
                });
        },


        /*
         * Resume the user's subscription on Stripe.
         */
        resumeSubscription: function () {
            this.resumeSubscriptionForm.errors = [];
            this.resumeSubscriptionForm.resuming = true;

            this.$http.post('settings/user/plan/resume')
                .success(function (user) {
                    this.user = user;
                    this.resumeSubscriptionForm.resuming = false;
                })
                .error(function (errors) {
                    this.resumeSubscriptionForm.resuming = false;
                    Spark.setErrorsOnForm(this.resumeSubscriptionForm, errors);
                });
        },


        /*
         * Get the feature list from the plan formatted for a tooltip.
         */
        getPlanFeaturesForTooltip: function (plan) {
            var result = '<ul>';

            _.each(plan.features, function (feature) {
                result += '<li>' + feature + '</li>';
            });

            return result + '</ul>';
        },


        /*
         * Initialize the tooltips for the plan features.
         */
        initializeTooltips: function () {
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip({
                    html: true
                });
            }, 250);
        }
    }
});
