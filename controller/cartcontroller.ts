import { Request,Response } from "express";
import { ThrowError } from "../util/ErrorUtil";
import * as UserUtil from "../util/UserUtil";
import cartCollection from "../schemas/cartschema";
import { ICart } from "../models/ICart";
import mongoose from "mongoose";
import { APP_CONSTANTS } from "../constants";
/**
 * @usage: create a cart
 * @url: http://localhost:9000/api/carts/
 * @params: products[{product,count,price}],total,tax,grandtotal
 * @method: post
 * @access: private
 */
export const createcart= async(request:Request,response:Response)=>{
    try{
         const{products,total,tax,grandtotal} =request.body;
         const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
         if(user){
            const cart = await cartCollection.findOne({userObj:user._id})
            if(cart){
                const deleteUser = await cartCollection.findOneAndDelete({userObj:user._id})
            }
            const newCart:ICart ={
                products:products,
                total:total,
                grandtotal:grandtotal,
                tax:tax,
                userObj:user._id
            }
            const thecart = await new cartCollection(newCart).save();
              if(!thecart){
                return response.status(404).json("cart creation failed")
              }
              console.log("product",products.product)
              const actualcart =await cartCollection.findById(new mongoose.Types.ObjectId(thecart._id)).populate({
                path:"products.product",
                strictPopulate:false
                
            }).populate({
                path:"userObj",
                strictPopulate:false
            })
                 return response.status(200).json({
                    msg:"cart creation success",
                    data: actualcart,
                    status:APP_CONSTANTS.SUCCESS
                 })
         }
        
    }
    catch{
        return ThrowError(response)
    }
}
/**
* @usage: get cart info
* @url: http://localhost:9000/cart/me
* @params: no-params
* @method: get
* @access: private
*/
export const getcartinfo = async(request:Request,response:Response)=>{
    try{
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
        if(user){
            const thecart =await cartCollection.findOne({userObj:new mongoose.Types.ObjectId(user._id)}).populate({
                path:"products.product",
                strictPopulate:false
                
            }).populate({
                path:"userObj",
                strictPopulate:false
            })
            return response.status(200).json({
                msg:"",
                data: thecart,
                status:APP_CONSTANTS.SUCCESS
             })
            
        }
    }
    catch{
        return ThrowError(response)
    }
}
