import express,{Router,Request,Response} from 'express';
import { body } from 'express-validator';
import *  as productcontroller from "../controller/productController";
import { tokenVerifier } from '../middleware/tokenVerifier';
import { validateForm } from '../middleware/validateForm';
import { request } from 'http';
const productRouter:Router = Router();
/**
 * @usage: create products
 * @url: http://localhost:9000/products/
 * @params: title,description,imageUrl,brand,price,quantity,categoryId,sucCategoryId
 * @method: post
 * @access: private
 */
productRouter.post("/",[
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageurl').not().isEmpty().withMessage("imageurl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subcategoryId is required")],
   tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await productcontroller.createProduct(request,response)
})
/**
 * @usage: update product
 * @url: http://localhost:9000/api/products/:productId
 * @params: title,description,imageUrl,brand,price,quantity,categoryId,sucCategoryId
 * @method: post
 * @access: private
 */
productRouter.put("/:productId",[
    body('title').not().isEmpty().withMessage("title is required"),
    body('description').not().isEmpty().withMessage("description is required"),
    body('imageurl').not().isEmpty().withMessage("imageUrl is required"),
    body('brand').not().isEmpty().withMessage("brand is required"),
    body('price').not().isEmpty().withMessage("price is required"),
    body('quantity').not().isEmpty().withMessage("quantity is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subcategoryId is required")],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await productcontroller.updateProduct(request,response)
})
/**
 * @usage:get product
 * @url: http://localhost:9000/api/products/:productId
 * @params: no-params
 * @method: get
 * @access: private
 */

productRouter.get("/:productId",tokenVerifier,async(request:Request,response:Response)=>{
    await productcontroller.getProduct(request,response)
})
/**
 * @usage:get all products
 * @url: http://localhost:9000/api/products/
 * @params: no-params
 * @method: get
 * @access: private
 */

productRouter.get("/",tokenVerifier,async(request:Request,response:Response)=>{
    await productcontroller.getAllProducts(request,response)
})

/**
 * @usage:delete a product
 * @url: http://localhost:9000/api/products/:productId
 * @params: no-params
 * @method: Delete
 * @access: private
 */
productRouter.delete("/:productId",tokenVerifier,async(request:Request,response:Response)=>{
    await productcontroller.deleteProduct(request,response)
})
/**
 * @usage:get all products with categoryId
 * @url: http://localhost:9000/products/categories/:categoryId
 * @params: no-params
 * @method: get
 * @access: private
 */

productRouter.get("/categories/:categoryId",tokenVerifier,async(request:Request,response:Response)=>{ 
    await productcontroller.getallproductswithcategoryId(request,response)
})
export default productRouter;