
export class ApiError {
    public httpStatusCode: number;
    public code: string;
    public type: string;
    public module?: string;
    public message: string;
    public info?: any;

    constructor(httpStatusCode: number, errorCode: string, type: string, messageForUser: string, info?: any) {
        this.httpStatusCode = httpStatusCode;
        this.code = errorCode;
        this.type = type;
        this.message = messageForUser;
        this.info = info;
    }
}