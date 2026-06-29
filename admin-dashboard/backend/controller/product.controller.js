import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image, brand } = req.body;
        // Validation
        if (!name || !description || !price || !category || stock === undefined || stock === null) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
            brand
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


//--------------------------get product-------------------------------
export const getProduct = async (req, res) => {
    try {
        const search = req.query.search || "";

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                    { brand: { $regex: search, $options: "i" } }
                ]
            };
        }

        const product = await Product.find(query);

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//--------------------------delete product----------------------------
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//--------------------------update product----------------------------
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
