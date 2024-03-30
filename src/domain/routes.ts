import userController from "./controller/user.controller";
import taskController from "./controller/task.controller";
import categoryController from "./controller/category.controller";
import dtoValidationMiddleware from "../util/dto-validation.middleware";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Router } from "express";

const routes = Router();

routes.get('/user', userController.getAll);
routes.get('/user/:id', userController.getById);
routes.post('/user', dtoValidationMiddleware(CreateUserDto), userController.create);
routes.delete('/user/:id', userController.delete);

routes.get('/task', taskController.getAll);
routes.get('/task/:id', taskController.getById);
routes.get('/task/pending', taskController.getTasksPending);
routes.get('/task/completed', taskController.getTasksCompleted);
routes.get('/task/by-category', taskController.getTasksGroupedByCategory);
routes.get('/task/longest-description', taskController.getTaskWithLongestDescription);
routes.get('/task/user/:id', taskController.getUserTasks)
routes.get('/task/user/:id/latest', taskController.getLatestTaskOfUser);
routes.get('/task/user/:id/oldest', taskController.getOldestTaskOfUser);
routes.get('/task/user/:id/count', taskController.getNumberOfTasksByUser);
routes.get('/task/category/:id', taskController.getTasksByCategory);
routes.post('/task', dtoValidationMiddleware(CreateTaskDto), taskController.create);
routes.delete('/task/:id', taskController.delete);

routes.get('/category', categoryController.getAll);
routes.get('/category/:id', userController.getById);
routes.post('/category', dtoValidationMiddleware(CreateCategoryDto), userController.create);
routes.delete('/category/:id', userController.delete);

export { routes }