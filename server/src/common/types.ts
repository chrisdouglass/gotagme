export class ResponseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type JWT = string;

export type StringAnyMap = {
  [x: string]: any,  // tslint:disable-line: no-any
};

export enum ApprovalState {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}
