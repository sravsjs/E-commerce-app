import { Request,Response } from "express";
import * as usercontroller from "../controller/userController";
import UserCollection from "../schemas/userSchema";
import mongoose from "mongoose";
import { IUser } from "../models/IUser";
import { ThrowError } from "./ErrorUtil";


export const getAuthUserinfoFromRequestHeader =  async(request:Request,response:Response)=>{
    try{
      //token user & login user  checking
        const userObj:any =  request.headers['user'];
        const theUser = userObj.id; 
        if(!theUser){
            return ThrowError(response,401," invalid user")

        }
            console.log("getuser data",request.headers['user'])
            const mongoUserId = new mongoose.Types.ObjectId(theUser)
            //check if the user exists or not
            const user:any= await UserCollection.findById(mongoUserId);
        
                if(!user){
                    console.log("user not found")
                    return ThrowError(response,401,"no user found")
        }
        return user;
        
    }catch(error:any){
        return ThrowError(response,500,"get auth failed");
    }
}