import {NextFunction, Request, Response} from 'express';

export interface BaseController {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
}
