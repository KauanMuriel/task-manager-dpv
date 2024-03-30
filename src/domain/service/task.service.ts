import { DeleteResult, UpdateResult } from "typeorm";
import { Task } from "../entity/task";
import { Status } from "../enum/status";
import { CreateUpdateTaskDto } from "../dto/create-update-task.dto";
import { TaskRepository } from "../repository/task.repository";
import { CategoryRepository } from "../repository/category.repository";
import { UserRepository } from "../repository/user.repository";
import NotFoundError from "../error/not-found.error";

export class TaskService {
    private _taskRepository: TaskRepository;
    private _userRepository: UserRepository;
    private _categoryRepository: CategoryRepository;

    public constructor() {
        this._taskRepository = new TaskRepository();
        this._categoryRepository = new CategoryRepository();
    }

    public getAll = async () => {
        return await this._taskRepository.getAll();
    }

    public getById = async (id: number): Promise<Task> => {
        return await this._taskRepository.getById(id);
    }

    public update = async (id: number, task: CreateUpdateTaskDto): Promise<UpdateResult> => {
        const relatedUser = await this._userRepository.getById(task.userId);
        const relatedCategory = await this._categoryRepository.getById(task.categoryId);

        if (!relatedUser) throw new NotFoundError(`User with id ${task.userId} was not found!`);
        if (!relatedCategory) throw new NotFoundError(`Cateogry with id ${task.categoryId} was not found!`);

        const toBeUpdatedTask = new Task(
            task.title,
            task.description,
            task.type,
            task.status,
            relatedCategory,
            relatedUser
        )
        return await this._taskRepository.update(id, toBeUpdatedTask);
    }

    public create = async (task: CreateUpdateTaskDto): Promise<Task> => {
        const relatedUser = await this._userRepository.getById(task.userId);
        const relatedCategory = await this._categoryRepository.getById(task.categoryId);

        if (!relatedUser) throw new NotFoundError(`User with id ${task.userId} was not found!`);
        if (!relatedCategory) throw new NotFoundError(`Cateogry with id ${task.categoryId} was not found!`);

        const newTask = new Task(
            task.title, 
            task.description, 
            task.type, 
            Status[task.status], 
            relatedCategory, 
            relatedUser
        );
        return this._taskRepository.save(newTask);
    }

    public delete = async (id: number): Promise<DeleteResult> => {
        return await this._taskRepository.delete(id);
    }

    public getUserTasks = async (id: number): Promise<Task[]> => {
        return await this._taskRepository.getByUser(id);
    }

    public getTasksByCategory = async (id: number): Promise<Task[]> => {        
        return await this._taskRepository.getByCategory(id);
    }

    public getTasksCompleted = async (): Promise<Task[]> => {
        return await this._taskRepository.getCompleted();
    }

    public getTasksPending = async (): Promise<Task[]> => {
        return await this._taskRepository.getPending();
    }

    public getNewestTaskOfUser = async (userId: number) => {
        return await this._taskRepository.getNewestTaskOfUser(userId);
    }

    public getOldestTaskOfUser = async (userId: number) => {
        return await this._taskRepository.getOldestTaskOfUser(userId);
    }

    public getNumberOfTasksByUser = async (userId: number): Promise<Number> => {
        return await this._taskRepository.getNumberOfUserTasks(userId);
    }

    public getAverageCompletionRateOfTasks = async (): Promise<Number> => {
        return await this._taskRepository.getAverageCompletionRate();
    }

    public getTaskWithLongestDescription = async (): Promise<Task> => {
        return await this._taskRepository.getWithLongestDescription();
    }

    public getTasksGroupedByCategory = async (): Promise<Task[]> => {
        return await this._taskRepository.getTasksGroupedByCategory();
    }
}