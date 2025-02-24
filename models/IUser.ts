export interface IUser{
    _id?:string;
    username:string;
    imageurl:string;
    isAdmin:boolean;
    isSuperAdmin:boolean;
    email:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date;
}