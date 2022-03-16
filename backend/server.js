import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js"
import orderRouter from "./routers/orderRouter.js"
import dotenv from 'dotenv'

const res = dotenv.config()
if(res.error){
  throw res.error
}
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazona')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter) 
app.use('/api/orders', orderRouter)  


//Middleware used to get error in my routes (expressAsyncHandler
app.use((err, req, res,next) => {
  res.status(500).send({message: err.message});
})

//Try to get environment port, if it doesn't exist use the default 5000'
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log("Server listening on port " + port);
});
