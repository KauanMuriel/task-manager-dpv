class NotFoundError extends Error {
    name: string = "NotFound";

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError;