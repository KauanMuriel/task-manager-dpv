import { Router } from "express";
import userController from "./controller/user.controller";
import taskController from "./controller/task.controller";
import categoryController from "./controller/category.controller";
import dtoValidationMiddleware from "../util/dtoValidation.middleware";

const routes = Router();

routes.get('/user', userController.getAll);
routes.get('/user/:id', userController.getById);
routes.post('/user', userController.create);
routes.delete('/user/:id', userController.delete);

routes.get('/task', taskController.getAll);
routes.get('/task/:id', taskController.getById);
routes.post('/task', taskController.create);
routes.delete('/task/:id', taskController.delete);
routes.get('/task/user/:id', taskController.getUserTasks)

routes.get('/category', categoryController.getAll);
routes.get('/category/:id', userController.getById);
routes.post('/category', userController.create);
routes.delete('/category/:id', userController.delete);


export { routes }