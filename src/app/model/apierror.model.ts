
export class ApiError {
    public code: number;
    public customCode: string;
    public type: string;
    public module?: string;
    public message: string;
    public info?: any;

    constructor(httpStatusCode: number, errorCode: string, type: string, messageForUser: string, info?: any) {
        this.code = httpStatusCode;
        this.customCode = errorCode;
        this.type = type;
        this.message = messageForUser;
        this.info = info;
    }
}