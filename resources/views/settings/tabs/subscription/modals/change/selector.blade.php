<div class="row">
	<!-- Monthly / Available Plans -->
	<div class="col-md-6">
		<div class="spark-plan-change-selector-heading">
			<span v-if="includesBothPlanIntervals">
				<strong>Monthly Plans</strong>
			</span>

			<span v-if=" ! includesBothPlanIntervals">
				<strong>Available Plans</strong>
			</span>
		</div>

		<div v-repeat="plan : defaultPlansExceptCurrent" style="margin-bottom: 10px;">
			@include('spark::settings.tabs.subscription.modals.change.plan')
		</div>
	</div>

	<!-- Yearly Plans -->
	<div class="col-md-6" v-if="includesBothPlanIntervals">
		<div class="spark-plan-change-selector-heading">
			<strong>Yearly Plans</strong>
		</div>

		<div v-repeat="plan : yearlyPlansExceptCurrent" style="margin-bottom: 10px;">
			@include('spark::settings.tabs.subscription.modals.change.plan')
		</div>
	</div>
</div>
