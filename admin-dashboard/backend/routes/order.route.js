import express from "express"
import { createOrder, getOrder, getTotalRevenue } from "../controller/order.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js"

const orderRouter = express.Router()

orderRouter.post("/createOrder", createOrder)
orderRouter.get("/getOrders",authMiddleware,isAdminMiddleware, getOrder)
orderRouter.get("/getTotalRevenue", getTotalRevenue)

export default orderRouter