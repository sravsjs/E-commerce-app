import mongoose from "mongoose"
import { ICategory, ISubCategory } from "../models/ICategory"
//childrem Schema
const subCategorySchema = new mongoose.Schema<ISubCategory>({
    name:{type:String,required:true,unique:true},
    description:{type:String,required:true}
})
export const subCategoryCollection = mongoose.model<ISubCategory>("subCategories",subCategorySchema);

//parent schema
const categorySchema = new mongoose.Schema<ICategory>({
    name:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    subCategories:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'subCategories'
        }
    ]
},{timestamps:true});

export const categorycollection = mongoose.model<ICategory>("categorycollection",categorySchema)