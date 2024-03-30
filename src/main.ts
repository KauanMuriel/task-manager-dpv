import App from "./app"
import { AppDataSource } from "./domain/data-source"

AppDataSource.initialize().then(async () => {
    let http = require(`http`);
    http.createServer(App).listen(3000, 'server');

    console.log(process.env)
}).catch(error => console.log(error))
