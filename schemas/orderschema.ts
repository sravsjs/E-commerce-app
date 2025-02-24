import mongoose from "mongoose";
import { IOrder } from "../models/IOrder";

const orderSchema =new mongoose.Schema<IOrder>({
   products:[
   
    {
        product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Products'}, 
        count:{type:Number,required:true},
        price:{type:Number,required:true}
      }
   
],
total:{type:Number,required:true},
tax:{type:Number,required:true},
grandtotal:{type:Number,required:true},
paymentType:{type:String,required:true},
orderstatus:{
    type:String,required:true,
    default:"Order Placed",
    enum:[
        "Order Placed",
        "Processing",
        "Dispatched",
        "Delivered",
        "Cancelled",
        "Completed"
    ]
},
orderBy :{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Users'},
},{timestamps:true});

const orderCollection = mongoose.model<IOrder>('orders',orderSchema);
export default orderCollection;