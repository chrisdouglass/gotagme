import { ApprovalState } from "../model/approval";
import { huskysoft } from "./protos";

export function protoApprovalStateFrom(state: ApprovalState): huskysoft.gotagme.common.ApprovalState {
  switch (state) {
    case ApprovalState.New:
      return huskysoft.gotagme.common.ApprovalState.NEW;
    case ApprovalState.Approved:
      return huskysoft.gotagme.common.ApprovalState.APPROVED;
    case ApprovalState.Rejected:
      return huskysoft.gotagme.common.ApprovalState.REJECTED;
  }
}
