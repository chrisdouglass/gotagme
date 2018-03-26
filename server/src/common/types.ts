export class ResponseError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export class NotFoundResponseError extends ResponseError {
  constructor() {
    super(404);
  }
}

export type JWT = string;

export type StringAnyMap = {
  [x: string]: any,  // tslint:disable-line: no-any
};

export type JSONResponse = StringAnyMap;
