
import { response } from "express";
import mongoose from "mongoose";


export class DbconnectionUtil{
    public static connectToMongoDb(connectionString:string,databaseName:string):Promise<string>{
       return new Promise((resolve, reject) => {
        mongoose.connect(connectionString,{
            dbName :databaseName
          }),(error:any) => {
           
            if(error){
               console.log(error);
               reject('DB connection Failed');
            }
            resolve('DB connection is success')  
          }
       })
    }
}