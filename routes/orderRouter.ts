import express,{Router,Request,Response} from 'express';
import { body } from 'express-validator';
import { tokenVerifier } from '../middleware/tokenVerifier';
import { validateForm } from '../middleware/validateForm';
import * as ordercontroller from "../controller/ordercontroller";

const orderRouter:Router = Router();
/**
 * @usage: create order
 * @url: http://localhost:9000/api/orders/place
 * @params: products[{product,count,price}],total,tax,grandtotal,paymenttype
 * @method: POST
 * @access: private
 */
orderRouter.post("/place",[
  body('products').not().isEmpty().withMessage("products is required"),
  body('total').not().isEmpty().withMessage("total is required"),
  body('tax').not().isEmpty().withMessage("tax is required"),
  body('grandtotal').not().isEmpty().withMessage("grandtotal is required"),
  body('paymentType').not().isEmpty().withMessage(" paymenttype is required"),
],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
  await  ordercontroller.placeorder(request,response)
})
/**
 * @usage: get all orders
 * @url: http://localhost:9000/api/orders/
 * @params: no-params
 * @method: get
 * @access: private
 */
orderRouter.get("/",tokenVerifier,async(request:Request,response:Response)=>{
  await  ordercontroller.getallorders(request,response)
})
/**
 * @usage: get my orders
 * @url: http://localhost:9000/api/orders/me
 * @params: no-params
 * @method: get
 * @access: private
 */
orderRouter.get("/me",tokenVerifier,async(request:Request,response:Response)=>{
  await  ordercontroller.getmyorders(request,response)
})
/**
 * @usage: update order
 * @url: http://localhost:9000/api/orders/:orderId
 * @params:orderstatus
 * @method: Post
 * @access: private
 */
orderRouter.put("/:orderId",[
  body('orderstatus').not().isEmpty().withMessage("orderstatus is required"),
  ],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
  console.log("Req is: ", request)
  console.log("Res is: ", response)
  await  ordercontroller.updateorderStatus(request,response)
})
export default orderRouter;