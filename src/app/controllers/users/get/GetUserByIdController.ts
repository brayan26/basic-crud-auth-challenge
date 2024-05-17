import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '@app/impl/BaseController';
import { UserService } from '@context/users/infrastructure/services/UserService';

export default class GetUserByIdController implements BaseController {
  constructor(private userService: UserService) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const user = await this.userService.getUserById(req.params.id as string)

    res.status(httpStatus.OK).send(user)
  }
}
