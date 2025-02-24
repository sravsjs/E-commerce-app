
import { Request,response,Response } from "express"
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { APP_CONSTANTS } from "../constants";
import UserCollection from "../schemas/userSchema";
import { IUser } from "../models/IUser";
import { ThrowError } from "../util/ErrorUtil";
import * as UserUtil from "../util/UserUtil";
import mongoose from "mongoose";



/** 
   @usage:Register user
   @method: post
   @params: username,email,password
   @url: http://localhost:9000/users/register
   @access:public
   */
export const registerUser = async(request:Request,response:Response)=>{
     try{
        //read the (form data from client
        
        const {username,email,password} = request.body;
        console.log("usercontroller",request.body)

       //check if the password exists or not
        const user = await UserCollection.findOne({email:email});
        if(user){
            return response.status(401).json({msg:"User is Already Exists",
                data:null,
            status:APP_CONSTANTS.SUCCESS
            });
        }
        //encrypt the password
        const salt=await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password,salt);

        //image url from gravatar
        let imageurl:string=gravatar.url(email,{
            size:"200",
            rating:"pg",
            default:"mm"
        })
        //create new user
        const newuser:IUser ={
            username:username,
                            email:email,
                            password:hashPassword,
                            imageurl:imageurl,
                            isAdmin:false,
                            isSuperAdmin:false
        }

        //save to db
        const createdUser = await new UserCollection(newuser).save();
       if(createdUser){
         return response.status(200).json({
            msg:"created user successfully",
             data:null,
            status:APP_CONSTANTS.SUCCESS
        })
       }
     }catch(error:any){
       return ThrowError(response)
     }
}
/**
   @usage:login user
   @method: post
   @params: email,password
   @url: http://localhost:9000/users/login
   @access:public
   */
export const loginUser = async(request:Request,response:Response)=>{
    try{
        //read the form data from client
       const {email,password} =request.body;
        
       //check if the email exists or not
       
       const user:IUser|undefined|null = await UserCollection.findOne({email:email});
       
       

       if(!user){
           return response.status(401).json({
            msg:"Invalid Email Credentials",
            data:null,
            status:APP_CONSTANTS.FAILED
        });
       }
        //check if the password exists or not  
       const isMatch:boolean =await bcryptjs.compare(password,user.password)
       if(!isMatch){
        return response.status(401).json({
            msg:"Invalid Password Credentials ",
            data:null,
            status:APP_CONSTANTS.FAILED
        });
       }
       //create secret key
       const secretKey:string|undefined = process.env.JWT_SECRET_KEY;
       if (!secretKey) {
        return response.status(500).json({ msg: "Server configuration error" });
    }
                      const payload = {
                          id:user._id,
                          email:user.email
                      }

       //create token
       if(secretKey){
                    jwt.sign(payload,secretKey,{
                        algorithm:"HS256",
                        expiresIn:100000000000
                    },(error,encoded)=>{
                        if(error){
                        return response.status(401).json({msg:"unable to generate token"})
                }
                                if(encoded){
                                return response.status(200).json({msg:"Login is success",
                                    token:encoded,
                                    data:user,
                                    status:APP_CONSTANTS.SUCCESS

                                })
                    }
           })
                    }
       
    }catch(error:any){
        return ThrowError(response)
    }
}
/**
   @usage:get user Info
   @method: GET
   @body:no-body
   @access:private
   @url: http://localhost:9999/users/me
   */
  export const getUserinfo = async(request:Request,response:Response)=>{
  try{
    const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
    if(user){
     return response.status(200).json({
        status:APP_CONSTANTS.SUCCESS,
        data:user,
        msg:""
    
    });
    }

  }catch(error:any){
    return ThrowError(response)
}
  }
/**
 * @usage: update profile picture
 * @url: http://localhost:9000/users/profile
 * @params: profile
 * @method: put
 * @access: private
 */
export const updateProfilePicture=async(request:Request,response:Response)=>{
    
    try{
        const theUser = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        
       
        const {imageurl}= request.body

        if (theUser) {
            theUser.imageurl = imageurl;
           const userObj = await theUser.save()
           if (userObj) {
            response.status(200).json({
                status:APP_CONSTANTS.SUCCESS,
                msg:"profile picture updated successfully",
                data:userObj
            })
        }
  
    }

    

    }
    catch{
             return ThrowError(response)
    }
}
/**
 * @usage: change password 
 * @url: http://localhost:9000/users/password
 * @params: password
 * @method: put
 * @access: public
 */
export const changepassword =async(request:Request,response:Response)=>{
    try{
        const {password}=request.body;
        //encrypt password
        const salt=await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password,salt);

        //check if the user exist or not
         const theuser:any= await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
         if(theuser){
            theuser.password = hashPassword;
           const userobj = await theuser.save();
         console.log("userobj",userobj);

         if(userobj){
            return response.status(200).json({
                status:APP_CONSTANTS.SUCCESS,
                msg:"password updated successfully",
                data:userobj
            })

         }
        }
    }
    catch{
             return ThrowError(response)
    }
}