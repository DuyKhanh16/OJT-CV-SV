import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate  {
    constructor(private readonly authService: AuthService) {}
    canActivate(context: ExecutionContext):Promise<boolean> |boolean {
      //  console.log("context", context);
       const request = context.switchToHttp().getRequest();
       const responce = context.switchToHttp().getResponse();

        
       const token = request.headers.authorization;
      //  console.log("token", token);

       if(!token?.startsWith("Bearer")) throw new UnauthorizedException();

       const newToken = token.split(" ")[1]; 
      //  console.log("newToken", newToken);
       const checkToken =  this.authService.verifyAccessToken(newToken).then((res)=>{
         request["account"] = res;
         // console.log("checkToken", res); 
       });
         
       if(!checkToken){
        throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
       }
       return true
    }
    
} 