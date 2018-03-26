import {ApprovalState} from '../model/approval';
import {huskysoft} from './protos';

export function protoApprovalStateFrom(state: ApprovalState):
    huskysoft.gotagme.ApprovalState {
  switch (state) {
    case ApprovalState.New:
      return huskysoft.gotagme.ApprovalState.NEW;
    case ApprovalState.Approved:
      return huskysoft.gotagme.ApprovalState.APPROVED;
    case ApprovalState.Rejected:
      return huskysoft.gotagme.ApprovalState.REJECTED;
    default:
      throw new Error(
          'Unhandled case while converting approval state to proto ' + state);
  }
}

export function approvalStateFromProto(proto: huskysoft.gotagme.ApprovalState): ApprovalState {
  switch (proto) {
    case huskysoft.gotagme.ApprovalState.NEW:
      return ApprovalState.New;
    case huskysoft.gotagme.ApprovalState.APPROVED:
      return ApprovalState.Approved;
    case huskysoft.gotagme.ApprovalState.REJECTED:
      return ApprovalState.Rejected;
    default:
      throw new Error(
          'Unhandled case while converting proto to approval state: ' + proto);
  }
}
