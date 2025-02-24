import { Request,Response,Router } from "express"
import { body } from "express-validator";
import { request } from "http";
import { validateForm } from "../middleware/validateForm";
import { tokenVerifier } from "../middleware/tokenVerifier";
import * as cartcontroller from "../controller/cartcontroller";

export const cartRouter:Router = Router()
/**
 * @usage: create a cart
 * @url: http://localhost:9000/carts/
 * @params: products[{product,count,price}],total,tax,grandtotal
 * @method: post
 * @access: private 
 */
cartRouter.post("/",[
    body('products').not().isEmpty().withMessage("products is required"),
    body('total').not().isEmpty().withMessage("total is required"),
    body('tax').not().isEmpty().withMessage("tax is required"),
    body('grandtotal').not().isEmpty().withMessage(" is grandtotal required"),
],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await  cartcontroller.createcart(request,response)
})
/**
* @usage: get cart info
* @url: http://localhost:9000/cart/
* @params: no-params
* @method: get
* @access: private
*/
cartRouter.get("/me",tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await  cartcontroller.getcartinfo(request,response)
})
export default cartRouter;
