<div class="panel panel-default">
	<div class="panel-heading">
		VAT / Extra Billing Information
	</div>

	<div class="panel-body">
		<div class="alert alert-info">
			If you need to add specific contact or tax information to your receipts, like your full business name,
			VAT identification number, or address of record, add it here. We'll make sure it shows up on every receipt.
		</div>

		<spark-errors form="@{{ extraBillingInfoForm }}"></spark-errors>

		<div class="alert alert-success" v-if="extraBillingInfoForm.updated">
			<strong>Done!</strong> Your extra billing information has been updated.
		</div>

		<form class="form-horizontal" role="form">
			<div class="form-group">
				<label for="key" class="col-md-3 control-label">Text</label>
				<div class="col-md-6">
					<textarea class="form-control" rows="7" v-model="extraBillingInfoForm.text"></textarea>
				</div>
			</div>

			<div class="form-group">
				<div class="col-md-offset-3 col-md-6">
					<button type="submit" class="btn btn-primary" v-on="click: updateExtraBillingInfo" v-attr="disabled: extraBillingInfoForm.updating">
						<span v-if="extraBillingInfoForm.updating">
							<i class="fa fa-btn fa-spin fa-spinner "></i> Updating
						</span>

						<span v-if=" ! extraBillingInfoForm.updating">
							<i class="fa fa-btn fa-save"></i> Update
						</span>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
