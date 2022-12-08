import express from "express";
import asyncHandler from 'express-async-handler';
import Product from "../models/ProductModel.js"
const productRouter = express.Router();

productRouter.get("/", asyncHandler(
    async (req, res) => {
        const productd = await Product.find({});
        res.json(productd);
    }
));

productRouter.get("/:id", asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product not fount");
        }
    }
));

export default productRouter;