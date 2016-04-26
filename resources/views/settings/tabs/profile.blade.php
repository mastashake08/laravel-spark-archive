<spark-settings-profile-screen inline-template>
	<div id="spark-settings-profile-screen" class="panel panel-default">
		<div class="panel-heading">Update Profile</div>

		<div class="panel-body">
			<spark-errors form="@{{ updateProfileForm }}"></spark-errors>

			<div class="alert alert-success" v-if="updateProfileForm.updated">
				<strong>Great!</strong> Your profile was successfully updated.
			</div>

			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-md-3 control-label">Name</label>
					<div class="col-md-6">
						<input type="text" class="form-control" name="name" v-model="updateProfileForm.name">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-3 control-label">E-Mail Address</label>
					<div class="col-md-6">
						<input type="email" class="form-control" name="email" v-model="updateProfileForm.email">
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-3">
						<button type="submit" class="btn btn-primary" v-on="click: updateProfile" v-attr="disabled: updateProfileForm.updating">
							<span v-if="updateProfileForm.updating">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Updating
							</span>

							<span v-if=" ! updateProfileForm.updating">
								<i class="fa fa-btn fa-save"></i> Update
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</spark-settings-profile-screen>

