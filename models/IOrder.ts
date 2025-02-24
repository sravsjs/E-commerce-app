import mongoose from "mongoose";
import { ICartProduct } from "./ICart";

export interface IOrder {
    _id?:string;
    products:ICartProduct[];
    total:number;
    tax:number;
    grandtotal:number;
    paymentType:string;
    orderstatus?:string;
    orderBy:mongoose.Schema.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;

}