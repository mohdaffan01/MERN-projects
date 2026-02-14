import Order from "../model/order.model.js";
import Product from "../model/product.model.js";

//------------------create Order -----------------------------
export const createOrder = async (req, res) => {
    try {
        const { user, product, noOfItem } = req.body;
        if (!user || !product || noOfItem <= 0) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }
        //find product price for set the value of totalAmount
        const productData = await Product.findById(product);
        if (!productData) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        if (productData.stock == 0 || noOfItem > productData.stock) {
            return res.status(400).json({
                success: false,
                message: "Product not available!"
            })
        }

        const totalAmount = noOfItem * productData.price;
        productData.stock = productData.stock - noOfItem;

        await productData.save();

        const order = await Order.create({
            user,
            product,
            noOfItem,
            totalAmount
        });

        const totalOrders = await Order.countDocuments();

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            totalOrders,
            data: order
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

//------------------get Order -----------------------------
export const getOrder = async (req, res) => {
    try {
        const searchData = req.query.search || "";

        const orders = await Order.find()
            .populate("user")
            .populate("product");

        const filterOrders = orders.filter((order) =>
            order.product?.name?.toLowerCase().includes(searchData.toLowerCase())
        );

        return res.status(200).json({
            totalOrders: filterOrders.length,
            success: true,
            data: filterOrders
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//---------------------------total revenue ----------------
export const getTotalRevenue = async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "delivered" });

        let totalRevenue = 0;

        orders.forEach((order) => {
            totalRevenue = totalRevenue + order.totalAmount;
        });

        return res.status(200).json({
            success: true,
            totalRevenue: totalRevenue,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error!",
        });
    }
};
