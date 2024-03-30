import { Repository, UpdateResult } from "typeorm";
import { Task } from "../entity/task";
import { AppDataSource } from "../data-source";
import { Status } from "../enum/status";

export class TaskRepository {
    private _databaseRepository: Repository<Task>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Task);
    }

    public save = async (task: Task): Promise<Task> => {
        return await this._databaseRepository.save(task);
    }

    public update = async (id: number, task: Task): Promise<UpdateResult> => {
        return await this._databaseRepository.update(id, task);
    }

    public delete = async (id: number) => {
        return await this._databaseRepository.delete(id);
    }

    public getAll = async (): Promise<Task[]> => {
        return await this._databaseRepository.find();
    }

    public getById = async (id: number): Promise<Task> => {
        return await this._databaseRepository.findOneBy({ id: id });
    }

    public getByUser = async (userId: number): Promise<Task[]> => {
        return await this._databaseRepository.findBy({ user: { id: userId } });
    }

    public getCompleted = async (): Promise<Task[]> => {
        return await this._databaseRepository.find({ where: { status: Status.COMPLETED } });
    }

    public getPending = async (): Promise<Task[]> => {
        return await this._databaseRepository.find({ where: { status: Status.PENDING } });
    }

    public getNewestTaskOfUser = async (userId: number) => {
        return await this._databaseRepository.findOne({ where: { user: { id: userId}}, order: { createdAt: 'DESC'}});
    }

    public getOldestTaskOfUser = async (userId: number) => {
        return await this._databaseRepository.findOne({ where: { user: {id: userId}}, order: { createdAt: 'ASC'}});
    }
    
    public getNumberOfUserTasks = async (userId: number): Promise<Number> => {
        return await this._databaseRepository.countBy({user: {id: userId}});
    }

    public getAverageCompletionRate = async(): Promise<Number> => {
        const numberOfTasks = await this._databaseRepository.count();
        return numberOfTasks / await this._databaseRepository.count({ where: { status: Status.COMPLETED}});
    }

    public getWithLongestDescription = async (): Promise<Task> => {
        return await this._databaseRepository
            .createQueryBuilder('task')
            .orderBy('LENGTH(task.description)', 'DESC')
            .getOne();
    }

    public getByCategory = async (categoryId: number): Promise<Task[]> => {
        return await this._databaseRepository
            .createQueryBuilder("task")
            .innerJoinAndSelect("task.category", "category")
            .where("category.id = :id", { categoryId })
            .getMany();
    }

    public getTasksGroupedByCategory = async (): Promise<Task[]> => {
        return await this._databaseRepository
            .createQueryBuilder('task')
            .select('task.category')
            .addSelect('SUM(task.id)', "quantity")
            .groupBy('task.category')
            .getRawMany();
    }
}