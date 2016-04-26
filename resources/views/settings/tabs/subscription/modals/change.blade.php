<div class="modal fade" id="modal-change-plan" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title"><i class="fa fa-btn fa-random"></i>Change Plan</h4>
			</div>

			<div class="modal-body">
				<spark-errors form="@{{ changePlanForm }}"></spark-errors>

				<!-- Plan Selector -->
				@include('spark::settings.tabs.subscription.modals.change.selector')
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

				<button type="button" class="btn btn-primary" v-on="click: changePlan" v-attr="disabled: changePlanForm.changing">
					<span v-if=" ! changePlanForm.changing">
						<i class="fa fa-btn fa-random"></i>Change Plan
					</span>

					<span v-if="changePlanForm.changing">
						<i class="fa fa-btn fa-spinner fa-spin"></i>Changing
					</span>
				</button>
			</div>
		</div>
	</div>
</div>
