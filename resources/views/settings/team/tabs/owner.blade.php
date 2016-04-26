<spark-team-settings-owner-screen inline-template>
	<div class="panel panel-default">
		<div class="panel-heading">The Basics</div>

		<div class="panel-body">
			<spark-errors form="@{{ updateTeamForm }}"></spark-errors>

			<div class="alert alert-success" v-if="updateTeamForm.updated">
				<strong>Great!</strong> Your team was successfully updated.
			</div>

			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-md-3 control-label">Name</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="name" v-model="updateTeamForm.name">
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-3">
						<button type="submit" class="btn btn-primary" v-on="click: updateTeam" v-attr="disabled: updateTeamForm.updating">
							<span v-if="updateTeamForm.updating">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Updating
							</span>

							<span v-if=" ! updateTeamForm.updating">
								<i class="fa fa-btn fa-save"></i> Update
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</spark-team-settings-owner-screen>
