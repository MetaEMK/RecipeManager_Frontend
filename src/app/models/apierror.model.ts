

export class ApiError {
    public httpCode: number;
    public module?: string;
    public type: string;
    public messageForUser: string;
    public info?: any;

    constructor(httpCode: number, type: string, messageForUser: string,module?: string, info?: any) {
        this.httpCode = httpCode;
        this.module = module;
        this.type = type;
        this.messageForUser = messageForUser;
        this.info = info;
    }
}