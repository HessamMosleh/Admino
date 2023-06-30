import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from '@app/shared/entities/session.entity';

export const GetSession = createParamDecorator(
  (data, ctx: ExecutionContext): Session => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
