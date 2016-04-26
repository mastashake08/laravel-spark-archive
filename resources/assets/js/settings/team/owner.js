Vue.component('spark-team-settings-owner-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        //
    },


    data: function () {
    	return {
    		user: null,
    		team: null,

    		updateTeamForm: {
    			name: '',
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
        },


        /*
         * Handle the "teamRetrieved" event.
         */
        teamRetrieved: function (team) {
            this.team = team;

            this.updateTeamForm.name = this.team.name;
        }
    },


    methods: {
    	/**
    	 * Update the team's information.
    	 */
    	updateTeam: function (e) {
    		e.preventDefault();

    		this.updateTeamForm.errors = [];
    		this.updateTeamForm.updated = false;
    		this.updateTeamForm.updating = true;

    		this.$http.put('/settings/teams/' + this.team.id, this.updateTeamForm)
    			.success(function (team) {
                    this.$dispatch('updateTeams');
                    this.$dispatch('teamUpdated', team);

    				this.updateTeamForm.updated = true;
    				this.updateTeamForm.updating = false;
    			})
    			.error(function (errors) {
                    Spark.setErrorsOnForm(this.updateTeamForm, errors);
    				this.updateTeamForm.updating = false;
    			});
    	}
    }
});
