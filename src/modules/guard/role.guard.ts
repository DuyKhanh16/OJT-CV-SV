import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nếu không có metadata về quyền, cho phép truy cập
    }
    
    // Kiểm tra quyền của người dùng
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role) {
      return false; // Nếu không có thông tin về người dùng hoặc quyền, không cho phép truy cập
    }
    // Kiểm tra xem người dùng có quyền nào trong danh sách quyền được yêu cầu không
    return roles.includes(user.role);
  }
}     