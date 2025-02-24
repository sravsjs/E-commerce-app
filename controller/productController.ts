import { ThrowError } from "../util/ErrorUtil"
import { Request,Response } from "express"
import * as UserUtil from "../util/UserUtil";
import productCollection from "../schemas/productschema";
import { IProduct } from "../models/IProduct";
import { APP_CONSTANTS } from "../constants";
import mongoose from "mongoose";
/**
 * @usage: create products
 * @url: http://localhost:9000/products/
 * @params: title,description,imageUrl,brand,price,quantity,categoryId,subcategoryId
 * @method: post
 * @access: private
 */
export const createProduct =async(request:Request,response:Response,)=>{
    try{

        const {title,description,imageurl,brand,price,quantity,categoryId,subCategoryId}=request.body;
        console.log("request",request.body)

        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const product = await productCollection.findOne({title:title});
            if(product){
                return response.status(404).json("products alredy exists")
            }
            //create product
            const newProduct:IProduct ={
                title:title,
                description:description,
                imageurl:imageurl,
                brand:brand,
                price:price,
                quantity:quantity,
                categoryObj:categoryId,
                subCategoryObj:subCategoryId,
                userObj:user._id
            }
            const saveProduct = await new productCollection(newProduct).save();
           
             
            if(saveProduct){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:saveProduct,
                    msg:"product created successfully"
                })
            }
        }
    }
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage: update products
 * @url: http://localhost:9000/api/products/:productId
 * @params: title,description,imageUrl,brand,price,quantity,categoryId,sucCategoryId
 * @method: put
 * @access: private
 */
export const updateProduct =async(request:Request,response:Response,)=>{
    try{
        const{productId} =request.params;
        const mongoProductId =new mongoose.Types.ObjectId(productId)

        const {title,description,imageurl,brand,price,quantity,categoryId,subCategoryId}=request.body;
        console.log("request",request.body)

        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const product = await productCollection.findById(mongoProductId);
            if(!product){
                return response.status(404).json("products has not found")
            }
            //create product
            const newProduct:IProduct ={
                title:title,
                description:description,
                imageurl:imageurl,
                brand:brand,
                price:price,
                quantity:quantity,
                categoryObj:categoryId,
                subCategoryObj:subCategoryId,
                userObj:user._id
            }
            const updateProduct = await productCollection.findByIdAndUpdate(mongoProductId,{
                $set: newProduct
            },{new:true});
            if(updateProduct){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:updateProduct,
                    msg:"product updated successfully"
                })
            }
        }
    }
    catch{
        return ThrowError(response)
    }
}

   
/**
 * @usage:get product
 * @url: http://localhost:9000/api/products/:productId
 * @params: no-params
 * @method: get
 * @access: private
 */
export const getProduct =async(request:Request,response:Response,)=>{
    try{
        const{productId} =request.params;
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const product:IProduct|any = await productCollection.findById(new mongoose.Types.ObjectId(productId)).populate({
                path:"userObj",
                strictPopulate:false
            }).populate({
                path:"categoryObj",
                strictPopulate:false
            }).populate({
                path:"subCategoryObj",
                strictPopulate:false
            })
            if(!product){
                return response.status(404).json("products has not found")
            }
            if(product){
               
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:product,
                    msg:""
                })
               

            }
        }

    }
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage:get all products
 * @url: http://localhost:9000/api/products/
 * @params: no-params
 * @method: get
 * @access: private
 */
export const getAllProducts =async(request:Request,response:Response,)=>{
    try{
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const products:IProduct[]|any = await productCollection.find().populate({
                path:"userObj",
                strictPopulate:false
            }).populate({
                path:"categoryObj",
                strictPopulate:false
            }).populate({
                path:"subCategoryObj",
                strictPopulate:false
            })
            if(products){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:products,
                    msg:""
                })
        }
    }
}
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage:delete a product
 * @url: http://localhost:9000/products/:productId
 * @params: no-params
 * @method: delete
 * @access: private
 */
export const deleteProduct =async(request:Request,response:Response,)=>{
    try{
        const {productId} =request.params;
        const mongoProductId = new mongoose.Types.ObjectId(productId)
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const product = await productCollection.findById(mongoProductId);
            if(!product){
                return response.status(404).json("product has not found");
            }

            const deleteProduct = await productCollection.findByIdAndDelete(mongoProductId)
            if(deleteProduct){
                return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data:deleteProduct,
                    msg:"[product deleted successfully"
                })
            }

    }
}
    catch{
        return ThrowError(response)
    }
}
/**
 * @usage:get all products with categoryId
 * @url: http://localhost:9000/api/products/categories/categoryId
 * @params: no-params
 * @method: get
 * @access: private
 */
export const getallproductswithcategoryId =async(request:Request,response:Response,)=>{
    try{
        const {categoryId}= request.params;
        const user = await UserUtil.getAuthUserinfoFromRequestHeader(request,response)
        if(user){
            const product:IProduct[]|any = await productCollection.find({categoryObj:categoryId}).populate({
                path:"userObj",
                strictPopulate:false
            }).populate({
                path:"categoryObj",
                strictPopulate:false
            }).populate({
                path:"subCategoryObj",
                strictPopulate:false
            });
           
            return response.status(200).json({
                status:APP_CONSTANTS.SUCCESS,
                data:product,
                msg:"successfully Get All Products"
            })
    }
}
    catch{
        return ThrowError(response)
    }
}