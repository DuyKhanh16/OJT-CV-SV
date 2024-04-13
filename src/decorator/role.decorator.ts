import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Roles = () => createParamDecorator(
    async(data:unknown,ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const allowedRoles = ["0","1","2"];
    return allowedRoles.includes(user.role);
    },
);