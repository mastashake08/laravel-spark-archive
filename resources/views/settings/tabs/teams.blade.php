<!-- Main Content -->
<spark-settings-teams-screen inline-template>
	<!-- Create Team -->
	<div class="panel panel-default">
		<div class="panel-heading">Create Team</div>

		<div class="panel-body">
			<spark-errors form="@{{ createTeamForm }}"></spark-errors>

			<form method="POST" class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-md-3 control-label">Name</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="name" v-model="createTeamForm.name">
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-3">
						<button type="submit" class="btn btn-primary" v-on="click: createTeam" v-attr="disabled: createTeamForm.creating">
							<span v-if="createTeamForm.creating">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Creating
							</span>

							<span v-if=" ! createTeamForm.creating">
								<i class="fa fa-btn fa-users"></i> Create
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<!-- Current Teams -->
	<div class="panel panel-default" v-if="user && teams.length > 0">
		<div class="panel-heading">Current Teams</div>

		<div class="panel-body">
			<table class="table table-responsive">
				<thead>
					<tr>
						<th>Name</th>
						<th>Owner</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-repeat="team : teams">
						<td class="spark-table-pad">
							@{{ team.name }}
						</td>

						<td class="spark-table-pad">
							<span v-if="userOwns(team)">
								You
							</span>

							<span v-if=" ! userOwns(team)">
								@{{ team.owner.name }}
							</span>
						</td>

						<td>
							<a href="/settings/teams/@{{ team.id }}">
								<button class="btn btn-default">
									<i class="fa fa-btn fa-cog"></i>Settings
								</button>
							</a>
						</td>

						<td>
							<button class="btn btn-warning" v-on="click: leaveTeam(team)" v-if=" ! userOwns(team)">
								<i class="fa fa-btn fa-sign-out"></i>Leave
							</button>
						</td>

						<td>
							<button class="btn btn-danger" v-on="click: confirmTeamDeletion(team)" v-if="userOwns(team)">
								<i class="fa fa-btn fa-times"></i>Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Pending Invitations -->
	<div class="panel panel-default" v-if="invitations.length > 0">
		<div class="panel-heading">Pending Invitations</div>

		<div class="panel-body">
			<table class="table table-responsive">
				<thead>
					<tr>
						<th>Team</th>
						<th>Owner</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-repeat="invite : invitations">
						<td class="spark-table-pad">
							@{{ invite.team.name }}
						</td>

						<td class="spark-table-pad">
							@{{ invite.team.owner.name }}
						</td>

						<td>
							<button class="btn btn-success" v-on="click: acceptInvite(invite)">
								<i class="fa fa-btn fa-thumbs-up"></i>Accept
							</button>
						</td>

						<td>
							<button class="btn btn-danger" v-on="click: rejectInvite(invite)">
								<i class="fa fa-btn fa-thumbs-down"></i>Reject
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="modal fade" id="modal-delete-team" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" v-if="teamToDelete">
					<button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title"><i class="fa fa-btn fa-times"></i>Delete Team (@{{ teamToDelete.name }})</h4>
				</div>

				<div class="modal-body">
					<p>
						Are you sure you want to delete this team? The team and all of its
						associated data will be permanently deleted.
					</p>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					<button type="button" class="btn btn-danger" v-on="click: deleteTeam" v-attr="disabled: deletingTeam">
						<span v-if=" ! deletingTeam">
							<i class="fa fa-btn fa-times"></i>Delete Team
						</span>

						<span v-if="deletingTeam">
							<i class="fa fa-btn fa-spinner fa-spin"></i>Deleting
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</spark-settings-teams-screen>
