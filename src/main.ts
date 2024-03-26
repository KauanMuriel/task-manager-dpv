import App from "./app"
import { AppDataSource } from "./domain/data-source"

AppDataSource.initialize().then(async () => {

    App.listen(3000, 'localhost');

}).catch(error => console.log(error))
