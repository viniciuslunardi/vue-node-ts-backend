import BaseController from '@src/controllers/base/BaseController';
import User from '@src/models/user/interface/User';
import { Router } from 'express';

export default class UserController extends BaseController {
	private _endPointName: string = 'users';
	
	public getName(): string {
		return this._endPointName;
	}
	
	get model(): typeof User {
		return User;
	}
	
	constructor(router: Router) {
		super(router);
		this.initBinds();
	}
}