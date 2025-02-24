import express,{Router,Request,Response} from 'express';
import * as userController from "../controller/userController";
import { body } from 'express-validator';
import { validateForm } from '../middleware/validateForm';
import { tokenVerifier } from '../middleware/tokenVerifier';


const userRouter:Router = Router();

/**
 * @usage: User Register
 * @url: http://localhost:9000/api/users/register
 * @params: username,email,password
 * @method: post
 * @access: public
 */
userRouter.post("/register",[ 
    body('username').not().isEmpty().withMessage("username is required"),
    body('email').isEmail().withMessage("email is required"),
    
    body('password').isStrongPassword().withMessage("password  is required")],validateForm,async(request:Request,response:Response)=>{
        console.log("userrouter")
         await userController.registerUser(request,response)
})

/**
 * @usage: Login User 
 * @url: http://localhost:9000/users/login
 * @params: email,password
 * @method: post
 * @access: public
 */
userRouter.post("/login",[  
     body('email').isEmail().withMessage("email is required"),
    body('password').isStrongPassword().withMessage("password  is required")],validateForm,async(request:Request,response:Response)=>{
    await userController.loginUser(request,response)
})
/**
 * @usage: get UserData 
 * @url: http://localhost:9000/users/me
 * @params: no-params
 * @method: get
 * @access: private
 */
userRouter.get("/me",tokenVerifier,async(request:Request,response:Response)=>{
    await userController.getUserinfo(request,response)
})
/**
 * @usage: update profile picture
 * @url: http://localhost:9000/users/profile
 * @params: ImageUrl
 * @method: put
 * @access: public
 */
userRouter.put("/profile",
    [ body('imageurl').not().isEmpty().withMessage("imageurl is required")],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await userController.updateProfilePicture(request,response)
})
/**
 * @usage: change password 
 * @url: http://localhost:9000/users/me
 * @params: no-params
 * @method: put
 * @access: private
 */
userRouter.put("/password",
    [body('password').isStrongPassword().withMessage("password is required")],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await userController.changepassword(request,response)
})
export default userRouter;