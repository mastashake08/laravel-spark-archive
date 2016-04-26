<spark-team-settings-edit-team-member-screen inline-template>
	<div class="modal fade" id="modal-edit-team-member" tabindex="-1" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content" v-if="editingTeamMember">
				<div class="modal-header">
					<button type="button " class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title"><i class="fa fa-btn fa-edit"></i>Edit Team Member (@{{ editingTeamMember.name }})</h4>
				</div>

				<div class="modal-body">
					<spark-errors form="@{{ updateTeamMemberForm }}"></spark-errors>

					<!-- Edit Team Member Form -->
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-md-3 control-label">Role</label>

							<div class="col-md-8">
								<select class="form-control" v-model="updateTeamMemberForm.role" options="assignableRoles">
								</select>
							</div>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					<button type="button" class="btn btn-primary" v-on="click: updateTeamMember" v-attr="disabled: updateTeamMemberForm.updating">
						<span v-if="updateTeamMemberForm.updating">
							<i class="fa fa-btn fa-spinner fa-spin"></i> Updating
						</span>

						<span v-if=" ! updateTeamMemberForm.updating">
							<i class="fa fa-btn fa-save"></i> Update
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</spark-team-settings-edit-team-member-screen>
