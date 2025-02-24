import { Router,Response,Request } from "express";
import * as addresscontroller from "../controller/addressController";
import { tokenVerifier } from "../middleware/tokenVerifier";
import { body } from "express-validator";
import { validateForm } from "../middleware/validateForm";

const addressRouter:Router= Router();
/**
 * @usage: Create new address
 * @url: http://localhost:9000/api/addresses/new
 * @params: mobile,flat,landmark,street,city,state,country,pincode
 * @method: post
 * @access: ptivate
 */

addressRouter.post("/new",[

    body('mobile').not().isEmpty().withMessage("mobile is required"),
    body('flat').not().isEmpty().withMessage("flat is required"),
    body('landmark').not().isEmpty().withMessage("landmark is required"),
    body('street').not().isEmpty().withMessage("street is required"),
    body('city').not().isEmpty().withMessage("city is required"),
    body('state').not().isEmpty().withMessage("state is required"),
    body('country').not().isEmpty().withMessage("country is required"),
    body('pincode').not().isEmpty().withMessage("pincode is required"),

],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
     await addresscontroller.createNewaddress(request,response);
})
/**
 * @usage: Delete address
 * @url: http://localhost:9000/api/addresses/:addressId
 * @params: no-params
 * @method: put
 * @access: ptivate
 */
addressRouter.delete("/:addressId",tokenVerifier,async(request:Request,response:Response)=>{
    await addresscontroller.deleteaddress(request,response);
})
/**
 * @usage: update address
 * @url: http://localhost:9000/api/addresses/:addressId
 * @params: mobile,flat,landmark,street,city,state,country,pincode
 * @method: put
 * @access: ptivate
 */
addressRouter.put("/:addressId",[
    body('mobile').not().isEmpty().withMessage("mobile is required"),
    body('flat').not().isEmpty().withMessage("flat is required"),
    body('landmark').not().isEmpty().withMessage("landmark is required"),
    body('street').not().isEmpty().withMessage("street is required"),
    body('city').not().isEmpty().withMessage("city is required"),
    body('state').not().isEmpty().withMessage("state is required"),
    body('country').not().isEmpty().withMessage("country is required"),
    body('pincode').not().isEmpty().withMessage("pincode is required"),

],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await addresscontroller.updateaddress(request,response);
})
/**
 * @usage: get address
 * @url: http://localhost:9000/api/addresses/me
 * @params: no-params
 * @method: get
 * @access: ptivate
 */
addressRouter.get("/me",tokenVerifier,async(request:Request,response:Response)=>{
    await addresscontroller.getaddress(request,response);
})

export default addressRouter;