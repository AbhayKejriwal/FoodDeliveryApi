// Import auth.service and jwt.utils
// Define functions:
//   - loginAdmin: Validate request, call auth.service, generate JWT, and return response
//   - loginUser: Same process for user login
//   - loginDeliveryMan: Same process for delivery man login

import { validateCredentials, createUser } from '../services/authServices.js';
import { generateToken } from '../utils/jwt.js';

export async function loginAdmin(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }
    try { 
        const admin = await validateCredentials(email, password, 'admin');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(admin._id, admin.role);
        
        res.cookie('auth', token, 
            { 
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 3600000,
                samesite: 'strict'
            }
        );

        res.status(200).json({ message: 'Admin logged in successfully'});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }
    try {
        const user = await validateCredentials(email, password, 'user');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.role);

        res.cookie('auth', token, 
            { 
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 3600000,
                samesite: 'strict'
            }
        );

        res.status(200).json({ message: 'User logged in successfully'});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export async function loginDeliveryMan(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }
    try {
        const deliveryMan = await validateCredentials(email, password, 'delivery');
        if (!deliveryMan) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(deliveryMan._id, deliveryMan.role);

        res.cookie('auth', token, 
            { 
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 3600000,
                samesite: 'strict'
            }
        );
        res.status(200).json({ message: 'Delivery Man logged in successfully'});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export async function register(req, res) {
    const {name, email, password, role} = req.body;
    if(!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields: name, email, password and role' });
    }
    const user = { name, email, password, role };
    try {
        const newUser = await createUser(user);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}