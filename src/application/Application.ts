import Server from '@src/server/Server';
import Database from '@src/database/Database';
import UserController from '@src/controllers/user/UserController';

export default class Application {
    private _server!: Server; // definite assignment assertion
    private _database!: Database;

    private _ready = false;


    public async init(): Promise<void> {
        console.info('connecting database');
        this._database = new Database();
        await this._database.init();

        console.info('connecting server');
        this._server = Server.instance;

        const controllers: any = [new UserController(this._server.router)];

        this._server.initializeControllers(controllers);

        this._ready = true;
    }

    get server(): Server {
        return this._server;
    }

    get database(): Database {
        return this._database;
    }
}
