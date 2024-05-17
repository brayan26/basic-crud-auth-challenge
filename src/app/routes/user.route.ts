import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import CreateUserController from '@app/controllers/users/create/CreateUserController';
import GetAllUsersController from '@app/controllers/users/get/GetAllUsersController';
import AuthValidator from '@app/middlewares/auth';
import GetUserByIdController from '@app/controllers/users/get/GetUserByIdController';

export const register = (router: Router) => {
  const createUserController: CreateUserController = container.get('Controller.User.Create');
  const getAllUsersController: GetAllUsersController = container.get('Controller.User.GetAll');
  const getUsersByIdController: GetUserByIdController = container.get('Controller.User.GetUserById');

  router.post('/users', AuthValidator.verify, (req: Request, res: Response, next: NextFunction) => {
    return createUserController.run(req, res, next);
  });

  router.get('/users', AuthValidator.verify, (req: Request, res: Response, next: NextFunction) => {
    return getAllUsersController.run(req, res, next);
  });

  router.get('/users/:id', AuthValidator.verify, (req: Request, res: Response, next: NextFunction) => {
    return getUsersByIdController.run(req, res, next);
  });
};
