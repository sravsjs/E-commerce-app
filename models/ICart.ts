import mongoose from "mongoose";

export interface ICartProduct {
    _id?:string;
    title:string;
    description:string;
    imageurl:string;
    brand:string;
    price:number;
    quantity:string;
    count:number;
    sold:number;
    categoryObj?:CategoryObj;
    subcategoryObj?:SubCategoryObj;
    createdAt?:string;
    updatedAt?:string;
    _v?:number;

}

export interface CategoryObj{
    _id?:string;
    name:string;
    description:string;
    subCategories:(string)[]|null;
    createdAt?:string;
    updatedAt?:string;


}
export interface SubCategoryObj{
    _id?:string;
    name:string;
    description:string;
    _v:number;
}
export interface ICartProduct{
    _id?:string;
    product:string;
    count:number;
    price:number;
}
export interface ICart{
    _id?:string;
    products:ICartProduct[];
    total:number;
    tax:number;
    grandtotal:number;
    userObj:mongoose.Schema.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;  
}