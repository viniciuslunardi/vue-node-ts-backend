import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import http from 'http';


export default class Server {
    private readonly _app: express.Express;
    public serverApp: http.Server;
    private static _instance: Server;

    private _router: Router = Router();

    constructor() {
        this._app = express();

        const port = process.env.PORT || '6000';
        this.serverApp = this.listen(parseInt(port));

        this.initializeMiddlewares();
        this.initializeErrorHandling();
    }

    static get instance(): Server {
        if (!Server._instance) {
            Server._instance = new Server();
        }

        return Server._instance;
    }

    private initializeMiddlewares() {
        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            bodyParser.json()(req, res, next);
            next();
        });
    }

    private initializeErrorHandling(): void {

    }

    public initializeControllers(controllers: any): void {

    }

    public initializeMissingRoutesRedirection(): void {

    }

    get router(): Router {
        return this._router;
    }

    private listen(port: number): http.Server {
        return this._app.listen(port, () => console.log('Process running on ' + port));
    }

    get app(): express.Express {
        return this._app;
    }

    public async destroy(): Promise<void> {
        await this.serverApp.close();
    }
}
