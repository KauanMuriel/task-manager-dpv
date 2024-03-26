import { Router } from "express";
import userController from "./controller/user-controller";

const routes = Router();
routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getById);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
export { routes }