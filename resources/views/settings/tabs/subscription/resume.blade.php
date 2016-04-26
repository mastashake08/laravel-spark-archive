<div class="panel panel-default" v-if="userIsOnGracePeriod">
	<div class="panel-heading">Resume Subscription</div>

	<div class="panel-body">
		<div class="alert alert-warning">
			Your subscription has been cancelled. The benefits of your subscription will continue until your current billing
			period ends on <strong>@{{ subscriptionEndsAt }}</strong>. You may resume your subscription at no
			extra cost until the end of the billing period.
		</div>

		<spark-errors form="@{{ resumeSubscriptionForm }}"></spark-errors>

		<button class="btn btn-primary" v-on="click: resumeSubscription" v-attr="disabled: resumeSubscriptionForm.resuming">
			<span v-if="resumeSubscriptionForm.resuming">
				<i class="fa fa-btn fa-spinner fa-spin"></i>Resuming
			</span>

			<span v-if=" ! resumeSubscriptionForm.resuming">
				<i class="fa fa-btn fa-clock-o"></i>Resume Subscription
			</span>
		</button>
	</div>
</div>
