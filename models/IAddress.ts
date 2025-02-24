import mongoose from "mongoose";
export interface IAddress {
    _id?:string;
    name:string;
    email:string;
    mobile:string;
    flat:string;
    landmark:string;
    street:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
    userObject:mongoose.Schema.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;



}