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
    
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }
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

    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }
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
    try {
        const {username, email, password, role} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields: username, email, password and role' });
        }
        const user = { username, email, password, role };
        const newUser = await createUser(user);
        newUser.password = undefined;
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}