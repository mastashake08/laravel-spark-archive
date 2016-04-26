Vue.component('spark-team-settings-edit-team-member-screen', {
    /*
     * Initial state of the component's data.
     */
	data: function () {
		return {
	        user: null,
	        team: null,
	        roles: [],

            editingTeamMember: null,

            updateTeamMemberForm: {
                role: '',
                errors: [],
                updating: false,
                updated: false
            }
		};
	},


	computed: {
        /**
         * Get the roles that may be assigned to users.
         */
        assignableRoles: function () {
            return _.reject(this.roles, function (role) {
                return role.value == 'owner';
            });
        },
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
        },


        /*
         * Handle the "rolesRetrieved" event.
         */
        rolesRetrieved: function (roles) {
            this.roles = roles;
        },


        /**
         * Receive a request to edit a given team member.
         */
        teamMemberEditRequested: function (member) {
            this.editingTeamMember = member;

            this.updateTeamMemberForm.role = member.pivot.role;

            $('#modal-edit-team-member').modal('show');
        }
	},


	methods: {
        /*
         * Edit a given team member.
         */
        updateTeamMember: function () {
            this.updateTeamMemberForm.errors = [];
            this.updateTeamMemberForm.updating = true;
            this.updateTeamMemberForm.updated = false;

            this.$http.put('/settings/teams/' + this.team.id + '/members/' + this.editingTeamMember.id, this.updateTeamMemberForm)
                .success(function (team) {
                    this.$dispatch('teamUpdated', team);

                    this.updateTeamMemberForm.updated = true;
                    this.updateTeamMemberForm.updating = false;

                    $('#modal-edit-team-member').modal('hide');
                })
                .error(function (errors) {
                    this.updateTeamMemberForm.errors = errors;
                    this.updateTeamMemberForm.updating = false;
                });
        }
	}
});
