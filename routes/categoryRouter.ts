import express,{Router,Request,Response, response} from 'express';
import * as categorycontroller from "../controller/categoryController";
import { body } from 'express-validator';
import { tokenVerifier } from '../middleware/tokenVerifier';
import { validateForm } from '../middleware/validateForm';

const categoryRouter:Router = Router();
/**
 * @usage: create category
 * @url: http://localhost:9000/api/categories/
 * @params: name,description
 * @method: post
 * @access: private
 */
categoryRouter.post("/",[
    body('name').not().isEmpty().withMessage("name is required"),
    body('description').not().isEmpty().withMessage("description is required")],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await categorycontroller.createcategory(request,response)
})
/**
 * @usage: create sub category
 * @url: http://localhost:9000/categories/:categoryId
 * @params: name,description
 * @method: post
 * @access: public
 */
categoryRouter.post("/:categoryId",[
    body('name').not().isEmpty().withMessage("name is required"),
    body('description').not().isEmpty().withMessage("description is required")],tokenVerifier,validateForm,async(request:Request,response:Response)=>{
    await categorycontroller.createSubCategory(request,response)
})
/**
 * @usage: get all categories
 * @url: http://localhost:9000/categories/
 * @params: no-params
 * @method: get
 * @access: public
 */
categoryRouter.get("/",async(request:Request,response:Response)=>{
    await categorycontroller.getAllCategories(request,response)
    
})
export default categoryRouter;