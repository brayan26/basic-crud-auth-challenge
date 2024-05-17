import { Request, Response, NextFunction } from 'express';
import { BaseController } from '@app/impl/BaseController';
import { AuthService } from '@context/auth/infrastructure/services/AuthService';

export default class LoginController implements BaseController {
  constructor(private authService: AuthService) {}

  async run(req: Request, res: Response, _next: NextFunction) {
    const { token, status } = await this.authService.login(req.body)

    res.status(status).send({token})
  }
}
