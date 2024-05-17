import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import LoginController from '@app/controllers/auth/get/LoginController';

export const register = (router: Router) => {
  const loginController: LoginController = container.get('Controller.Auth.Login');

  router.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {
    return loginController.run(req, res, next);
  });
};
