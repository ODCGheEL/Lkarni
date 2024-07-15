const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const err = require("jsonwebtoken/lib/JsonWebTokenError");
const prisma = new PrismaClient();


exports.register = async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        })
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}