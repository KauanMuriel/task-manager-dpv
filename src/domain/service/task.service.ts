import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/task";

export class TaskService {
    private _repository: Repository<Task>;

    public constructor() {
        this._repository = AppDataSource.getRepository(Task);

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async getAll() {
        return await this._repository.find();
    }

    public async getById(id: number): Promise<Task> {
        return await this._repository.findOneBy({id: id});
    }

    public async update(task: Task): Promise<UpdateResult> {
        return await this._repository.update({id: task.id}, task);
    }

    public async create(task: Task): Promise<Task> {
        return this._repository.save(task);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this._repository.delete(id);
    }

    public async getUserTasks(id: number): Promise<Task[]> {
        return await this._repository.findBy({user: {id: id}});
    }
}