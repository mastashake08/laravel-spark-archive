<spark-settings-security-password-screen inline-template>
	<div class="panel panel-default">
		<div class="panel-heading">Update Password</div>

		<div class="panel-body">
			<spark-errors form="@{{ updatePasswordForm }}"></spark-errors>

			<div class="alert alert-success" v-if="updatePasswordForm.updated">
				<strong>Great!</strong> Your password was successfully updated.
			</div>

			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label class="col-md-3 control-label">Current Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="old_password" v-model="updatePasswordForm.old_password">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-3 control-label">New Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="password" v-model="updatePasswordForm.password">
					</div>
				</div>

				<div class="form-group">
					<label class="col-md-3 control-label">Confirm Password</label>
					<div class="col-md-6">
						<input type="password" class="form-control" name="password_confirmation" v-model="updatePasswordForm.password_confirmation">
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-3">
						<button type="submit" class="btn btn-primary" v-on="click: updatePassword">
							<span v-if="updatePasswordForm.updating">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Updating
							</span>

							<span v-if=" ! updatePasswordForm.updating">
								<i class="fa fa-btn fa-save"></i> Update
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</spark-settings-security-password-screen>
