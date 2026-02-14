import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image, brand } = req.body;
        // Validation
        if (!name || !description || !price || !category || stock === 0) {
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
                name: { $regex: search, $options: "i" }
            };
        }

        const product = await Product.find(query)
            .select("_id name description price category stock");

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
