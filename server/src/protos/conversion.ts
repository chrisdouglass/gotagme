import {ApprovalState} from '../model/approval';
import {huskysoft} from './protos';

export function protoApprovalStateFrom(state: ApprovalState):
    huskysoft.gotagme.approval.ApprovalState {
  switch (state) {
    case ApprovalState.New:
      return huskysoft.gotagme.approval.ApprovalState.NEW;
    case ApprovalState.Approved:
      return huskysoft.gotagme.approval.ApprovalState.APPROVED;
    case ApprovalState.Rejected:
      return huskysoft.gotagme.approval.ApprovalState.REJECTED;
    default:
      throw new Error(
          'Unhandled case while converting approval state to proto ' + state);
  }
}

export function approvalStateFromProto(
    proto: huskysoft.gotagme.approval.ApprovalState): ApprovalState {
  switch (proto) {
    case huskysoft.gotagme.approval.ApprovalState.NEW:
      return ApprovalState.New;
    case huskysoft.gotagme.approval.ApprovalState.APPROVED:
      return ApprovalState.Approved;
    case huskysoft.gotagme.approval.ApprovalState.REJECTED:
      return ApprovalState.Rejected;
    default:
      throw new Error(
          'Unhandled case while converting proto to approval state: ' + proto);
  }
}
