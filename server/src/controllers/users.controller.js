import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateToken } from '../config/generateToken.js';
import { transporter } from '../config/emailConfig.js';
import { Op } from "sequelize";
dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { name, email, areaCode, phoneNumber, password } = req.body;
        const existingUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            areaCode: areaCode,
            phoneNumber: phoneNumber,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, phoneNumber, areaCode, postalCode, address, identificationNumber, recipientName } = req.body;

        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedFields = {
            name: name || user.name,
            email: email || user.email,
            phoneNumber: phoneNumber || user.phoneNumber,
            areaCode: areaCode || user.areaCode,
            postalCode: postalCode || user.postalCode,
            address: address || user.address,
            identificationNumber: identificationNumber || user.identificationNumber,
            recipientName: recipientName || user.recipientName,
            password: hashedPassword,
        };

        await User.update(updatedFields, {
            where: {
                id: userId,
            },
        });

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.destroy({
            where: {
                id: userId,
            },
        });

        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getToken = async (req, res) => {
    const token = req.body.token;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.sub;
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' });
    }
};


export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = generateToken(user.id);
        const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: `
                <p>Hello,</p>
                <p>You have requested to reset your password.</p>
                <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Funko Store</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful. Redirecting..." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
};

export const assignAdminRole = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await User.update({ role: 'admin' }, {
            where: { id: userId }
        });
        if (updatedUser[0] === 1) {
            res.status(200).send('Admin role assigned successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};


