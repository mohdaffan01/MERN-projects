import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";

const productRouter = express.Router();

productRouter.post("/createProduct",authMiddleware,isAdminMiddleware, createProduct)
productRouter.get("/getProduct", getProduct)
productRouter.delete("/deleteProduct/:id", authMiddleware, isAdminMiddleware, deleteProduct)
productRouter.put("/updateProduct/:id", authMiddleware, isAdminMiddleware, updateProduct)


export default productRouter