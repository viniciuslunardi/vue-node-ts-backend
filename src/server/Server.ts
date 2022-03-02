import express, { Request, Response, NextFunction, Router } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import asyncHandler from "express-async-handler";

import {
	errorHandler,
} from '@src/server/middlewares/Middlewares';

export default class Server {
	private readonly _app: express.Express;
	public serverApp: http.Server;
	private static _instance: Server;
	
	private _router: Router = Router();
	
	constructor() {
		this._app = express();
		
		const port = process.env.APP_PORT || '6000';
		this.serverApp = this.listen(parseInt(port));
		
		this.initializeMiddlewares();
		// this.initializeErrorHandling();
	}
	
	static get instance(): Server {
		if (!Server._instance) {
			Server._instance = new Server();
		}
		
		return Server._instance;
	}
	
	private initializeMiddlewares() {
		this.app.use((req: Request, res: Response, next: NextFunction): void => {
			bodyParser.json()(req, res, next);
		});
		this.app.use(asyncHandler((req: Request, res: Response, next: NextFunction) => {
			next();
		}));
	}
	
	private initializeErrorHandling(): void {
		this.app.use(errorHandler);
	}
	
	public initializeControllers(controllers: any): void {
		for (const controller of controllers) {
			console.log(`initializing controller ${ controller.getName() }`);
			this._app.use('/api', controller.router);
		}
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
