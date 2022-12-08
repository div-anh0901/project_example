import express from "express";
import dotenv from "dotenv";
import connectDatabase from './config/MongoDb.js'
import ImportData from "./DataImport.js";
import productRouter from "./routers/ProductRoutes.js"
dotenv.config();
const PORT = process.env.PORT;
connectDatabase()
const app = express();

//API 
app.use("/api/import", ImportData)
app.use("/api/products", productRouter)

// LOAD PRODUCT FROM SERVER
app.get("/", (req, res, next) => {
    res.send("API is Running..")
});

app.listen(PORT, console.log("server running port " + PORT))