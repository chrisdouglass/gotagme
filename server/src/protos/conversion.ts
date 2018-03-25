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
