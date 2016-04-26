<div class="panel panel-default">
	<div class="panel-heading">The Basics</div>
	<div class="panel-body">
		<spark-errors form="@{{ registerForm }}"></spark-errors>

		<form class="form-horizontal" role="form" id="subscription-basics-form">
			@if (Spark::usingTeams())
				<div class="form-group" v-if=" ! invitation">
					<label class="col-md-4 control-label">Team Name</label>
					<div class="col-md-6">
						<input type="text" class="form-control spark-first-field" name="team_name" v-model="registerForm.team_name">
					</div>
				</div>
			@endif

			<div class="form-group">
				<label class="col-md-4 control-label">Name</label>
				<div class="col-md-6">
					<input type="text" class="form-control spark-first-field" name="name" v-model="registerForm.name">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">E-Mail Address</label>
				<div class="col-md-6">
					<input type="email" class="form-control" name="email" v-model="registerForm.email">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">Password</label>
				<div class="col-md-6">
					<input type="password" class="form-control" name="password" v-model="registerForm.password">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">Confirm Password</label>
				<div class="col-md-6">
					<input type="password" class="form-control" name="password_confirmation" v-model="registerForm.password_confirmation">
				</div>
			</div>

			<div v-if="freePlanIsSelected">
				<div class="form-group">
					<div class="col-sm-6 col-sm-offset-4">
						<div class="checkbox">
							<label>
								<input type="checkbox" v-model="registerForm.terms"> I Accept The <a href="/terms" target="_blank">Terms Of Service</a>
							</label>
						</div>
					</div>
				</div>

				<div class="form-group">
					<div class="col-sm-6 col-sm-offset-4">
						<button type="submit" class="btn btn-primary" v-on="click: register" v-attr="disabled: registerForm.registering">
							<span v-if="registerForm.registering">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Registering
							</span>

							<span v-if=" ! registerForm.registering">
								<i class="fa fa-btn fa-check-circle"></i> Register
							</span>
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
