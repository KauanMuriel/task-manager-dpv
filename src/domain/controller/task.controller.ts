import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import { Task } from "../entity/task";
import { CreateUpdateTaskDto } from "../dto/create-update-task.dto";

class TaskController {
    private _service: TaskService;

    public constructor() {
        this._service = new TaskService();
    }

    public async getAll(req: Request, res: Response): Promise<Task[]> {
        return await this._service.getAll();
    }

    public async getById(req: Request, res: Response) {
        try {
            const task = await this._service.getById(Number(req.params.id));
            res.json(task);
        } catch(error) {
            res.status(400).json({ message: error.message});
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const taskId = parseInt(req.params.id);

            if (isNaN(taskId)) {
                return res.status(400).json({ message: "The category id must be an integer"});
            }

            const updatedTask = await this._service.update(taskId, req.body as CreateUpdateTaskDto);
            return res.json(updatedTask);
        } catch(error) {
            res.status(400).json({message: error.message});
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const createdTask = this._service.create(req.body as CreateUpdateTaskDto);
            res.json(createdTask);
        } catch(error) {
            res.status(400).json({message: error.message});
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const result = this._service.delete(Number(req.params.id));
            res.json(result);
        } catch(error) {
            res.status(400).json({message: error.message});
        }
    }

    public async getUserTasks(req: Request, res: Response) {
        const tasks = await this._service.getUserTasks(Number(req.params.id));
        if (tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(400).json({ message: "The user don't has tasks registered!"});
        }
    }

    public getTasksByCategory = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "The category id must be an integer"});
        }

        const tasks = await this._service.getTasksByCategory(id);
        return res.json(tasks);
    }

    public getTasksPending = async (req: Request, res: Response) => {
        const tasks = await this._service.getTasksPending();
        return res.json(tasks);
    }

    public getTasksCompleted = async (req: Request, res: Response) => {
        const tasks = await this._service.getTasksCompleted();
        return res.json(tasks);
    }

    public getNumberOfTasksByUser = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "The user id must be an integer"});
        }
        const numberOfTasks = await this._service.getNumberOfTasksByUser(userId);
        return res.json(numberOfTasks);
    }

    public getNewestTaskOfUser = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "The user id must be an integer"});
        }
        const latestTask = await this._service.getNewestTaskOfUser(userId);
        return res.json(latestTask);
    }

    public getOldestTaskOfUser = async (req: Request, res: Response)  => {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "The user id must be an integer"});
        }
        const oldestTask = await this._service.getOldestTaskOfUser(userId);
        return res.json(oldestTask);
    }

    public getTaskWithLongestDescription = async (req: Request, res: Response) => {
        const task = await this._service.getTaskWithLongestDescription();
        return res.json(task);
    }

    public getAverageCompletionRateOfTasks = async (req: Request, res: Response) => {
        const completionRate = await this._service.getAverageCompletionRateOfTasks();
        return res.json(completionRate);
    }

    public getTasksGroupedByCategory = async (req: Request, res: Response) => {
        const tasks = await this._service.getTasksGroupedByCategory();
        return res.json(tasks);
    }
}

export default new TaskController();