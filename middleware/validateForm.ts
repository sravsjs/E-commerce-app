import { Request,Response,NextFunction } from "express";

import { validationResult} from "express-validator";
import { APP_CONSTANTS } from "../constants";


export const validateForm = (request:Request,response:Response,next:NextFunction):void=>{
    
    const errors = validationResult(request);
    console.log(errors.array())
            if(!errors.isEmpty()){
                response.status(400).json({
                    msg:errors.array().map(error => error.msg).join('\n'),
                data:null,
                status:APP_CONSTANTS.FAILED
            })
            return
            }
            next();
}