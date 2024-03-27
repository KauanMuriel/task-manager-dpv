import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import { Task } from "../entity/task";

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
            const updatedTask = await this._service.update(new Task());
            return res.json(updatedTask);
        } catch(error) {
            res.status(400).json({message: error.message});
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const createdTask = this._service.create(req.body);
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
}

export default new TaskController();