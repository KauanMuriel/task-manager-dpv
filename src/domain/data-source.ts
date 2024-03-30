import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { Task } from "./entity/task"
import { Category } from "./entity/category"
import { env } from "process"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Task, Category],
    migrations: [],
    subscribers: [],
})
