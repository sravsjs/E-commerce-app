
import { Request,Response } from "express";
import { ThrowError } from "../util/ErrorUtil";
import * as UserUtil from "../util/UserUtil";
import AddressCollection from "../schemas/addressschema";
import mongoose from "mongoose";
import { IAddress } from "../models/IAddress";
import { APP_CONSTANTS } from "../constants";

/**
 * @usage: Create new address
 * @url: http://localhost:9000/addresses/new
 * @params:mobile,flat,landmark,street,city,state,country,pincode
 * @method: post
 * @access: ptivate
 */
export const createNewaddress= async(request: Request,response:Response) =>{
    try{
        const { mobile,flat,landmark,street,city,state,country,pincode} = request.body;
        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        console.log(user);
           if(user){
            //check if the address exists for user or not
            const addressObj = await  AddressCollection.findOne({userObject:new mongoose.Types.ObjectId(user._id)});
            console.log("address obj",addressObj);
            if(addressObj){
                //delete address with address obj

                await AddressCollection.findByIdAndDelete(new mongoose.Types.ObjectId(addressObj._id))
            }else{
                //create
                const theAddress:IAddress = {
                
                    name:user.username,
                    email:user.email,
                    mobile:mobile,
                    flat:flat,
                    landmark:landmark,
                    street:street,
                    city:city,
                    state:state,
                    country:country,
                    pincode:pincode,
                    userObject:user._id
                    
                }
                const newAddress = await new AddressCollection(theAddress).save();
                console.log("newaddress",newAddress)
                    if(newAddress){
                        return response.status(200).json({
                            status:APP_CONSTANTS.SUCCESS,
                            msg:"new shipping address added successfully",
                            data: newAddress,

                        })
                    }
            }
           }


    } catch (error){
        return ThrowError(response)
    }

    
}
/**
 * @usage: Delete address
 * @url: http://localhost:9000/api/addresses/:addressId
 * @params: Name,email,mobile,address,landmark,street,city,state,country,pincode
 * @method: put
 * @access: ptivate
 */
export const deleteaddress= async(request: Request,response:Response) =>{
    try{

        const {addressId}=request.params;
        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const theAddress:IAddress|undefined|any= await AddressCollection.findById(new mongoose.Types.ObjectId(addressId));
            if(!theAddress){
                return ThrowError(response,404,"no address found");
            }
            const addressObj = await AddressCollection.findByIdAndDelete(new mongoose.Types.ObjectId(addressId))
                   return response.status(200).json({
                    status:APP_CONSTANTS.SUCCESS,
                    data: addressObj,
                    msg:"address deleted successfully",
                    
                   })
        }

    } catch (error){
        return ThrowError(response)
      
    }
}
/**
 * @usage: update address
 * @url: http://localhost:9000/api/addresses/:addressId
 * @params:mobile,flat,landmark,street,city,state,country,pincode
 * @method: put
 * @access: ptivate
 */
export const updateaddress= async(request: Request,response:Response) =>{
    try{
        const{addressId} =request.params;
        const mongoAddressId = new mongoose.Types.ObjectId(addressId);

        const { mobile,flat,landmark,street,city,state,country,pincode} = request.body;

        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
         if(user){
         const theAddress:IAddress|undefined|null = await AddressCollection.findById(mongoAddressId);
            if(!theAddress){
                return ThrowError(response,404,"no address found");
            }
            const addressObj = await AddressCollection.findByIdAndUpdate(mongoAddressId,{
                $set:{
                    
                    name:user.username,
                    email:user.email,
                    mobile:mobile,
                    flat:flat,
                    landmark:landmark,
                    street:street,
                    city:city,
                    state:state,
                    country:country,
                    pincode:pincode,
                    userObject:user._id
                    
                        
                }
            },{new:true}) 
            if(addressObj){
                return response.status(200).json({
                    data: addressObj,
                    msg:"shipping address is updated successfully",
                    status:APP_CONSTANTS.SUCCESS
                })
            }
         }
    } 
    catch (error){
        return ThrowError(response)
    }
}
/**
 * @usage: get address
 * @url: http://localhost:9000/api/addresses/me
 * @params: no-params
 * @method: get
 * @access: ptivate
 */
export const getaddress= async(request: Request,response:Response) =>{
    try{
        const user:any = await UserUtil.getAuthUserinfoFromRequestHeader(request,response);
        if(user){
        const theAddress:IAddress|undefined|null = await AddressCollection.findOne({userObject:new mongoose.Types.ObjectId(user._id)});
           if(!theAddress){
               return ThrowError(response,404,"no address found");
           }
           return response.status(200).json({
            status:APP_CONSTANTS.SUCCESS,
            msg:"Address found",
            data:theAddress
           })
        }
    } catch (error){
        return ThrowError(response)
    }
}
