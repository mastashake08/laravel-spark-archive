@if (Spark::supportsTwoFactorAuth())
	<spark-settings-security-two-factor-screen inline-template>
		<!-- Enable Two-Factor Authentication -->
		<div v-if="user">
			<div class="panel panel-default" v-if=" ! user.using_two_factor_auth">
				<div class="panel-heading">Two-Factor Authentication</div>

				<div class="panel-body">
					<div class="alert alert-info">
						To use two factor authentication, you <strong>must</strong> install the
						<a href="https://authy.com" target="_blank">Authy</a> application on your phone.
					</div>

					<spark-errors form="@{{ twoFactorForm }}"></spark-errors>

					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-md-3 control-label">Country Code</label>
							<div class="col-md-6">
								<input type="text" class="form-control" name="country_code" v-model="twoFactorForm.country_code" placeholder="1">
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-3 control-label">Phone Number</label>
							<div class="col-md-6">
								<input type="text" class="form-control" name="phone_number" v-model="twoFactorForm.phone_number" placeholder="555-555-5555">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-3">
								<button type="submit" class="btn btn-primary" v-on="click: enableTwoFactorAuth" v-attr="disabled: twoFactorForm.updating">
									<span v-if="twoFactorForm.enabling">
										<i class="fa fa-btn fa-spinner fa-spin"></i> Enabling
									</span>

									<span v-if=" ! twoFactorForm.enabling">
										<i class="fa fa-btn fa-phone"></i> Enable
									</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<!-- Disable Two-Factor Authentication -->
			<div class="panel panel-default" v-if="user.using_two_factor_auth">
				<div class="panel-heading">Two-Factor Authentication</div>

				<div class="panel-body">
					<div class="alert alert-info">
						To use two factor authentication, you <strong>must</strong> install the
						<a href="https://authy.com" target="_blank">Authy</a> application on your phone.
					</div>

					<div class="alert alert-success" v-if="twoFactorForm.enabled">
						<strong>Nice!</strong> Two-factor authentication is enabled for your account.
					</div>

					<form role="form">
						<button type="submit" class="btn btn-danger" v-on="click: disableTwoFactorAuth" v-attr="disabled: disableTwoFactorForm.disabling">
							<span v-if="disableTwoFactorForm.disabling">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Disabling
							</span>

							<span v-if=" ! disableTwoFactorForm.disabling">
								<i class="fa fa-btn fa-times"></i> Disable
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	</spark-settings-security-two-factor-screen>
@endif
