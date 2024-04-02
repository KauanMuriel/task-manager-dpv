import userController from "./controller/user.controller";
import taskController from "./controller/task.controller";
import categoryController from "./controller/category.controller";
import dtoValidationMiddleware from "../util/dto-validation.middleware";
import { CreateUpdateCategoryDto } from "./dto/create-update-category.dto";
import { CreateUserDto } from "./dto/register.dto";
import { CreateUpdateTaskDto } from "./dto/create-update-task.dto";
import { Request, Response, Router } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";

const routes = Router();

routes.get('/ping', (req: Request, res: Response) => { return res.json({ message: "pong"})});

routes.get('/user', userController.getAll);
routes.get('/user/:id', userController.getById);
routes.post('/user', dtoValidationMiddleware(CreateUserDto), userController.create);
routes.put('/user/:id', dtoValidationMiddleware(UpdateUserDto), userController.update);
routes.delete('/user/:id', userController.delete);

routes.get('/task', taskController.getAll);
routes.get('/task/:id', taskController.getById);
routes.get('/task/pending', taskController.getTasksPending);
routes.get('/task/completed', taskController.getTasksCompleted);
routes.get('/task/by-category', taskController.getTasksGroupedByCategory);
routes.get('/task/longest-description', taskController.getTaskWithLongestDescription);
routes.get('/task/user/:id', taskController.getUserTasks)
routes.get('/task/user/:id/newest', taskController.getNewestTaskOfUser);
routes.get('/task/user/:id/oldest', taskController.getOldestTaskOfUser);
routes.get('/task/user/:id/count', taskController.getNumberOfTasksByUser);
routes.get('/task/category/:id', taskController.getTasksByCategory);
routes.post('/task', dtoValidationMiddleware(CreateUpdateTaskDto), taskController.create);
routes.put('/task/:id', dtoValidationMiddleware(CreateUpdateTaskDto), taskController.update)
routes.delete('/task/:id', taskController.delete);

routes.get('/category', categoryController.getAll);
routes.get('/category/:id', userController.getById);
routes.post('/category', dtoValidationMiddleware(CreateUpdateCategoryDto), categoryController.create);
routes.put('/category/:id', dtoValidationMiddleware(CreateUpdateCategoryDto), categoryController.update);
routes.delete('/category/:id', userController.delete);

export { routes }