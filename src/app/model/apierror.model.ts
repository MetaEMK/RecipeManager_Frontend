
export class ApiError {
    public httpStatusCode: number;
    public errorCode: string;
    public type: string;
    public module?: string;
    public messageForUser: string;
    public info?: any;

    constructor(httpStatusCode: number, errorCode: string, type: string, messageForUser: string, info?: any) {
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.type = type;
        this.messageForUser = messageForUser;
        this.info = info;
    }
}