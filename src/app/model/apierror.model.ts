
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

    public static getBadRequestError(error: any)
    {

        switch (error.code) {
            case 'NAME_INVALID_LENGTH':
                return new ApiError(400, 'NAME_INVALID_LENGTH', 'Bad Request', 'Der Name darf nicht länger als 20 (bei Varianten 30) Zeichen lang sein.');

            case 'NAME_INVALID':
                return new ApiError(400, 'NAME_INVALID', 'Bad Request', 'Der Name ist nicht gültig.', error);

            case 'LIMIT_FILE_SIZE':
                return new ApiError(400, 'LIMIT_FILE_SIZE', 'Bad Request', 'Die Datei ist zu groß. Es sind nur Bilder mit unter 1 MB erlaubt.', error);
            
            default:
                return new ApiError(400, 'BAD_REQUEST', 'Bad Request', 'Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut.', error);
        }
    }
}