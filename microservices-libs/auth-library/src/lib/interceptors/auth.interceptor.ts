import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const auth = context.switchToRpc()
        const token = auth.getData()
        return next.handle().pipe();
    }
}