import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { Task } from "./entity/task"
import { Category } from "./entity/category"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Task, Category],
    migrations: [],
    subscribers: [],
})
