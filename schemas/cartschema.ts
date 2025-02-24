import { ICart } from "../models/ICart"
import mongoose from "mongoose"

const cartSchema =new mongoose.Schema<ICart>({
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
userObj :{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Users'},
},{timestamps:true});

const cartCollection = mongoose.model<ICart>('carts',cartSchema);
export default cartCollection;