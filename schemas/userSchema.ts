import mongoose, { Schema } from "mongoose";
import { IUser } from "../models/IUser";
import { scheduler } from "timers/promises";
import { debug } from "console";

const UserSchema = new mongoose.Schema<IUser>({
    username:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    imageurl:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    isSuperAdmin:{type:Boolean,required:true,default:false}

},{timestamps:true});

const UserCollection = mongoose.model<IUser>('Users',UserSchema);

export default UserCollection;