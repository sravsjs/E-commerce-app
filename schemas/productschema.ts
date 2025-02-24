import { timeStamp } from "console";
import mongoose from "mongoose";
import { IProduct } from "../models/IProduct";

const productSchema =new mongoose.Schema<IProduct>({


    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    imageurl:{type:String,required:true},
    brand:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    sold:{type:Number,required:true,default:0},
    userObj:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Users'},
    categoryObj:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'categorycollection'},
    subCategoryObj:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'subCategories'}
    


},{timestamps:true});

const productCollection = mongoose.model<IProduct>('Products',productSchema);
export default productCollection;