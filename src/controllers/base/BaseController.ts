import { Document, model, Model } from 'mongoose';
import { Request, Response } from 'express';
import { BAD_REQUEST, NO_CONTENT, NOT_FOUND } from 'http-status';
import { Router } from 'express';

export default abstract class BaseController {
	private readonly _router: Router;
	
	protected abstract get model(): any;
	
	abstract getName(): string;
	
	protected initBinds(): void {
		this.router.post(`/${ this.getName() }`, this.create.bind(this));
		this.router.get(`/${ this.getName() }/:id`, this.findById.bind(this));
		this.router.get(`/${ this.getName() }`, this.findAll.bind(this));
		this.router.patch(`/${ this.getName() }/:id`, this.update.bind(this));
		this.router.delete(`/${ this.getName()}/:id`, this.delete.bind(this));
	}
	
	protected constructor(router: Router) {
		this._router = router;
	}
	
	get router(): Router {
		return this._router;
	}
	
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const record = await this.model.create(req.body);
			return res.json(record);
			
		} catch (error) {
			console.error(error);
			return res.status(BAD_REQUEST).send({ error });
		}
	}
	
	public async update(req: Request, res: Response): Promise<any> {
		await this.model.updateOne({ _id: req.params.id }, req.body);
		return res.sendStatus(NO_CONTENT);
	}
	
	public async findById(req: Request, res: Response): Promise<any> {
		const document = await this.model.findOne({ _id: req.params.id });
		
		if (!document) {
			return res.status(NOT_FOUND).send('Not found');
		}
		
		return res.json(document);
	}
	
	public async findAll(req: Request, res: Response): Promise<any> {
		const documents = await this.model.find();
		
		return res.json(documents);
	}
	
	async delete(req: any, res: Response): Promise<Response> {
		const id = req.params.id;
		
		const remove = await this.model.updateOne({ _id: id }, { deleted_at: new Date() });
		if (!remove) {
			return res.status(BAD_REQUEST).send('Error');
		}
		
		return res.sendStatus(NO_CONTENT);
	}
}