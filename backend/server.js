import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js"
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/amazona')

app.use('/api/users', userRouter)

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  console.log(product)
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({message: "Product not found."});
  }
});

app.get("/", (req, res) => {
  res.send("It works!");
});

//Middleware used to get error in my routes (expressAsyncHandler
app.use((err, req, res,next) => {
  res.status(500).send({message: err.message});
})

//Try to get environment port, if it doesn't exist use the default 5000'
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log("Server listening on port " + port);
});
