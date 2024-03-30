import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpError from "../domain/error/http.error";

function dtoValidationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
        const dtoObject = plainToInstance(type, req.body);
        validate(dtoObject, { skipMissingProperties })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const dtoErrors = errors.map((error: ValidationError) =>
                        (Object as any).values(error.constraints)).join(", ");
                    next(new HttpError(dtoErrors));
                } else {
                    req.body = dtoObject;
                    next();
                }
            });
    }
}

export default dtoValidationMiddleware;