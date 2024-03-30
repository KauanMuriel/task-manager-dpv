import { env } from "process";
import App from "./app"
import { AppDataSource } from "./domain/data-source"

console.log(env.DB_HOST)

AppDataSource.initialize().then(async () => {

    App.listen(3000, 'localhost');

}).catch(error => console.log(error))
