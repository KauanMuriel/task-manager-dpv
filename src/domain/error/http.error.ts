import { stat } from "fs";

class HttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}

export default HttpError;