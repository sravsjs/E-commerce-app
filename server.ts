import  express,{Request,Response,Application} from "express";
import dotEnv from "dotenv"
import productRouter from "./routes/productRouter";
import addressRouter from "./routes/addressRouter";
import userRouter from "./routes/userRouter";
import cartRouter from "./routes/cartRouter";
import categoryRouter from "./routes/categoryRouter";
import orderRouter from "./routes/orderRouter";
import { DbconnectionUtil } from "./db/DButil";
import cors from "cors";
import { loggerMiddleWare } from "./middleware/loggerMiddleware";

const app:Application=express();

//configure cors
app.use(cors())

//configure dotenv
dotEnv.config({path:'./.env'})

//configure the express to read the form data
app.use(express.json());

//configure the logger middleware
app.use(loggerMiddleWare);


const port:Number|string|undefined = process.env.PORT ||9000;
const databaseUrl: string|undefined=process.env.MONGO_DB_CLOud_URL;
const databasename: string|undefined =process.env.DATABASE_NAME;

app.get("/",(request:Request,response:Response)=>{
    response.status(201);
    response.json({
        msg: "welocme to the express js",
    

    })
})

//configure routes
app.use("/api/products",productRouter)
app.use("/api/addresses",addressRouter)
app.use("/api/users",userRouter)
app.use("/api/carts",cartRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/orders",orderRouter)

if(port && databaseUrl && databasename){
    app.listen(Number(port),()=>{
        if(databaseUrl && databasename){
         DbconnectionUtil.connectToMongoDb(databaseUrl,databasename).then((response)=>{
            
                console.log("response");
            
        }).catch((error)=>{
             console.log(error,"unable to connecct!");
             process.exit(0)// force stop server stop the node js process
        })
    }
        console.log( `express server is running on ${port}`)
     }) 
}
