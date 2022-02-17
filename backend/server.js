import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js"
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazona')

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)


//Middleware used to get error in my routes (expressAsyncHandler
app.use((err, req, res,next) => {
  res.status(500).send({message: err.message});
})

//Try to get environment port, if it doesn't exist use the default 5000'
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log("Server listening on port " + port);
});
