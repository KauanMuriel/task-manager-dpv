class HttpError extends Error {
    name: string = "NotFound";

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export default HttpError;