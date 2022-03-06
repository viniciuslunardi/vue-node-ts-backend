import BaseController from '@src/controllers/base/BaseController';
import User from '@src/models/user/interface/User';
import { Request, Response, Router } from 'express';

export default class UserController extends BaseController {
  private _endPointName = 'users';

  public getName(): string {
    return this._endPointName;
  }

  get model(): typeof User {
    return User;
  }

  constructor(router: Router) {
    super(router);
    this.init();
  }

  protected init(): void {
    this.initBinds();
  }

  public initBinds(): void {
    super.initBinds();
    console.log('initializing custom routes');
  }
}
