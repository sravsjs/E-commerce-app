import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const tokenVerifier =async(request:Request,response:Response,next:NextFunction):Promise<void> => {
 try{
  //read the token from request header

  let secretKey:string | undefined = process.env.JWT_SECRET_KEY;
  let token = request.headers['x-auth-token']; //to read the token we use request headers
        
      if(!token){
       response.status(401).json({msg:"no token provided"});
       return;
      }

  if(secretKey  && typeof token === "string"){
     
               let decodeobj: any = jwt.verify(token,secretKey,{algorithms:["HS256"]})//scanning the token to get payload
               request.headers['user'] = decodeobj;
               console.log("token verifier",request.headers);
               console.log("decode object",decodeobj);
                  next();      
         }else{
            response.status(401).json({msg:"Invalid  token provided"});
             }
  

 }catch(error){
    response.status(401).json({msg:"no token provided"})
 }

}