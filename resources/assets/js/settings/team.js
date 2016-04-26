Vue.component('spark-team-settings-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
	ready: function () {
		this.getTeam();
		this.getRoles();
	},


    /*
     * Initial state of the component's data.
     */
	data: function () {
		return { team: null };
	},


	events: {
	    /*
	     * Handle the "teamUpdated" event. Broadcast back to all tabs.
	     */
		teamUpdated: function (team) {
			this.team = team;

			this.$broadcast('teamRetrieved', team);
		}
	},


	methods: {
	    /*
	     * Get the team from the API.
	     */
		getTeam: function () {
            this.$http.get('/spark/api/teams/' + TEAM_ID)
                .success(function (team) {
                	this.team = team;

                	this.$broadcast('teamRetrieved', team);
                });
		},


		/**
		 * Get all of the roles that may be assigned to users.
		 */
		getRoles: function () {
			this.$http.get('/spark/api/teams/roles')
				.success(function (roles) {
					this.roles = roles;

					this.$broadcast('rolesRetrieved', roles);
				});
		}
	}
});
