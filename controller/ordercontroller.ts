import { ThrowError } from "../util/ErrorUtil"
import { Request,Response } from "express"
import * as UserUtil from "../util/UserUtil";
import orderCollection from "../schemas/orderschema";
import { IOrder } from "../models/IOrder";
import mongoose from "mongoose";
import { APP_CONSTANTS } from "../constants";
/**
 * @usage: place an order
 * @url: http://localhost:9000/api/orders/
 * @params:products[{product,count,price}],total,tax,grandtotal,paymenttype
 * @method: post
 * @access: private
 */
export const placeorder  =async(request:Request,response:Response,)=>{
    try{
           
           const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
         if(user){
            const{products,total,tax,grandtotal,paymentType}= request.body;
            const newOrder:IOrder ={
                products:products,
                total:total,
                grandtotal:grandtotal,
                tax:tax,
                orderBy:user._id,
                paymentType:paymentType
            }
           
            const order = await new orderCollection(newOrder).save()
           
            if(!order){
                return response.status(404).json({msg:"order creation is failed"})
            }
            const theOrder = await orderCollection.findById(new mongoose.Types.ObjectId(order._id)).populate({
                path:"products.product",
                strictPopulate:false
                
            })
            
            return response.status(200).json({
                msg:"order creation success",
                data: theOrder,
                status:APP_CONSTANTS.SUCCESS
             })
            
    }
}
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage: get all  orders
 * @url: http://localhost:9000/api/orders/
 * @params: no-params
 * @method: get
 * @access: private
 */
export const getallorders  =async(request:Request,response:Response,)=>{
    try{
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
        if(user){
            const orders:IOrder[]|any = await orderCollection.find().populate({
                path:"products.product",
                strictPopulate:false
                
            }).populate({
                path:"orderBy",
                strictPopulate:false
                
            }).sort({createdAt:'descending'})
            return response.status(200).json({
                msg:"",
                data: orders,
                status:APP_CONSTANTS.SUCCESS

            })
    }
}
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage: get my  order
 * @url: http://localhost:9000/api/orders/me
 * @params: no-params
 * @method: get
 * @access: private
 */
export const getmyorders  =async(request:Request,response:Response,)=>{
    try{
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
        if(user){
            //if we use findone wil receive one order in insomia instead all orders of the user
            const orders:IOrder|any = await orderCollection.find({orderBy:new mongoose.Types.ObjectId(user._id)}).populate({
                path:"products.product",
                strictPopulate:false
                
            })
            .populate({
                path:"orderBy",
                strictPopulate:false
                
            }).sort({createdAt:'descending'})
             
            return response.status(200).json({
                msg:"",
                data:orders,
                status:APP_CONSTANTS.SUCCESS

            })

    }
}
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage: updateorderStatus
 * @url: http://localhost:9000/api/orders/:orderId
 * @params:orderstatus
 * @method: put
 * @access: private
 */
export const updateorderStatus  =async(request:Request,response:Response,)=>{
    try{
        const {orderId}= request.params;
        const{orderstatus}= request.body;
       
        console.log("PARAMs ", request.params)
        console.log("orderId ", orderId)
        console.log("orderstatus ", orderstatus)

        const mongoOrderId = new mongoose.Types.ObjectId(orderId);
        console.log("mongoOrderId ", mongoOrderId)
        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
        if(user){
            const thOrder :IOrder|any= await orderCollection.findById(mongoOrderId)
            console.log("the order from mongo",thOrder);

            if(!thOrder){
                return response.status(404).json({msg:"order doesnot exists"})

            }//updating order
            thOrder.orderstatus = orderstatus;
            console.log("before order update saved")
            /* 
            CAREFULL:
            
            This was failing to update in mongo db because of mismatch of parameter in schema
            i.e in insomania i gave order status as "processing", but in schema i have defined as "Processing"
            */
            await thOrder.save();
            console.log("order update saved")
             const actualorder = await orderCollection.findById(mongoOrderId)
             console.log("updated order",actualorder)
             return response.status(200).json({
                msg:"orderstatus is Updated!",
                data:actualorder,
                status:APP_CONSTANTS.SUCCESS

             })
    }
}
    catch{
        return ThrowError(response)
    }
}