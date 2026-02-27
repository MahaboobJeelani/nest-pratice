import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enums';
import { ROLES_KEY } from './roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  // We use Reflector in NestJS to read metadata that was attached to classes or methods using decorators like @SetMetadata().
  constructor(private reflextor:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflextor.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        // get the class metadata
        context.getClass()
      ]
    )

    if(!requiredRoles) return true
    const request = context.switchToHttp().getRequest<{headers: Record<string, string>}>();
    const userRole = request.headers['x-user-role'] as Role
    return requiredRoles.includes(userRole);
  }
}
