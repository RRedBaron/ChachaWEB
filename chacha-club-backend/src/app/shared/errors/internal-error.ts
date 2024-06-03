export class InternalError extends Error {
    name = InternalError.name;

    public message: string;
    public data?: any;
    public code?: number | string;

    constructor(message: string, data?: any, code?: number | string) {
        super();
        this.message = message;
        this.data = data;
        this.code = code;
    }
}
