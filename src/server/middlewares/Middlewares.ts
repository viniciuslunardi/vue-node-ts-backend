import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

import HttpException from '@src/exceptions/httpExceptions/HttpException';

const errorHandlerMiddleware = async (
	error: HttpException,
	_req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	next();
};

export { errorHandlerMiddleware as errorHandler };