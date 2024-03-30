import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/task";
import { Status } from "../enum/status";

export class TaskService {
    private _repository: Repository<Task>;

    public constructor() {
        this._repository = AppDataSource.getRepository(Task);

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
        this.getUserTasks = this.getUserTasks.bind(this);
        this.getTasksByCategory = this.getTasksByCategory.bind(this);
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

    public getTasksByCategory = async (id: number): Promise<Task[]> => {        
        return await this._repository
            .createQueryBuilder("task")
            .innerJoinAndSelect("task.category", "category")
            .where("category.id = :id", { id })
            .getMany();
    }

    public getTasksCompleted = async (): Promise<Task[]> => {
        return await this._repository.find({ where: { status: Status.COMPLETED }});
    }

    public getTasksPending = async (): Promise<Task[]> => {
        return await this._repository.find({ where: { status: Status.PENDING }});
    }

    public getLatestTaskOfUser = async (userId: number) => {
        return await this._repository.findOne({ where: { user: { id: userId}}, order: { createdAt: 'DESC'}});
    }

    public getNumberOfTasksByUser = async (userId: number): Promise<Number> => {
        return await this._repository.countBy({user: {id: userId}});
    }
}