
import { Request,Response } from "express"
import { ThrowError } from "../util/ErrorUtil"
import * as UserUtil from "../util/UserUtil";
import { categorycollection, subCategoryCollection } from "../schemas/categoryschema";
import { ICategory, ISubCategory } from "../models/ICategory";
import { APP_CONSTANTS } from "../constants";
import mongoose from "mongoose";
/**
 * @usage: create category
 * @url: http://localhost:9000/categories/
 * @params: name,description
 * @method: post
 * @access: private
 */
export const createcategory = async(request:Request,response:Response)=>{
    try{
        const {name,description} =request.body;
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const categoryObj:ICategory|undefined|null = await categorycollection.findOne({name:name})
            if(categoryObj){
                return ThrowError(response,404,"category is already exists")
            }

            //create category

            const category :ICategory={
                name:name,
                description:description,
                subCategories: [] as ISubCategory[]
            }
            const thecategory = await new categorycollection(category).save();
            if(thecategory){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:thecategory,
                    msg:"category created successfully"
                })
            }
        } 

    }
    catch{
             return ThrowError(response)
    }
}
/**
 * @usage: create sub category
 * @url: http://localhost:9000/categories/:categoryId
 * @params: name,description
 * @method: post
 * @access: private
 */
export const createSubCategory=async(request:Request,response:Response)=>{
    try{
        const {categoryId} = request.params;
        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);

        const {name,description} =request.body;
        if(user){
         const mongoCategoryId = new mongoose.Types.ObjectId(categoryId);
           const categoryobj:any = await categorycollection.findById(mongoCategoryId);
           if(!categoryobj){
            return ThrowError(response,404,"no category found")
           }
           const subctegoryObj:any = await subCategoryCollection.findOne({name:name})
           if(subctegoryObj){
            return ThrowError(response,404,"subcategory already exists")
           }
           const subcategory:ISubCategory={
             name:name,
             description:description
           }
           const savesubcategory = await new subCategoryCollection(subcategory).save()
           if(savesubcategory){
            //push the sub category data to subcategories and categoryObj
            categoryobj.subCategories.push(savesubcategory);
            //save to db            
            let thecategory =await categoryobj.save()
            if(thecategory){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    msg:"subcategory category created succefully",
                    data:thecategory
                })
            }
           }
        }

    }
    catch{
             return ThrowError(response)
    }
}
/**
 * @usage: get all categories
 * @url: http://localhost:9000/api/categories/
 * @params: no-params
 * @method: get
 * @access: public
 */
export const getAllCategories=async(request:Request,response:Response)=>{
    try{
       
        const getCategories = await categorycollection.find().populate({
            path:"subCategories",
            strictPopulate:false
        })
        
        if(getCategories){
            return response.status(200).json({
                status:APP_CONSTANTS.SUCCESS,
                msg:"get all categories succefully",
                data:getCategories
            })

    }
}
    catch{
             return ThrowError(response)
    }
}