import { Response,Request,NextFunction } from "express";
interface Logger{
    requestUrl:string,
    method:string,
    requestTime:string,
    requestDate:string
}
export const loggerMiddleWare=(request:Request,response:Response,next:NextFunction)=>{
    const logger:Logger={
        requestUrl:request.url,
        method:request.method,
        requestTime:new Date().toLocaleTimeString(),
        requestDate:new Date().toLocaleDateString()
    }
    console.log(`URL:${logger.requestUrl}-method:${logger.method}-requestTime:${logger.requestTime}-requestDate:${logger.requestDate}`);
    next();
}