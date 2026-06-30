import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        if (!data?.name?.trim() || !data?.email?.trim() || !data.username?.trim() || !data?.password?.trim() || !data?.confirmPassword?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const usernameExist = await User.findOne({ username: data.username });
        if (usernameExist) {
            return res.status(409).json({
                success: false,
                message: "Username already exist!"
            })
        }
        const emailExist = await User.findOne({ email: data.email });
        if (emailExist) {
            return res.status(409).json({
                success: false,
                message: "Email already exists!"
            });
        }
        if (data.password !== data.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Confirm password not match!"
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({
            name: data.name,
            email: data.email,
            username: data.username,
            password: hashedPassword,
            confirmPassword: data.confirmPassword,
            role: data.role
        })
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json({
            user: user,
            success: true,
            message: "User created successfully"
        })

    } catch (error) {
        next(error);
    }
}

//------------------get user--------------------------
export const getUser = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        let query = {}
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { username: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            };
        }
        const users = await User.find(query).select("name email username role");

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

//---------------------------------Login---------------------------------
export const login = async (req, res, next) => {
    try {
        const data = req.body;

        //  Check empty fields
        if (!data?.username?.trim() || !data?.password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // Find user
        const user = await User.findOne({ username: data.username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Compare password
        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        if (user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "Admin access only!"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "7d" });
        //  Success
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(200).json({
            success: true,
            message: "Login successfully!",
        });

    } catch (error) {
        next(error)
    }
};

//---------------------------------Get Profile----------------------------
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password -confirmPassword");
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};
