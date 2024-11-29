// Import express Router and auth.controller
// Define endpoints:
//   - POST /login-admin
//   - POST /login-user
//   - POST /login-delivery-man
// Attach respective controller functions to routes

import { Router } from 'express';
import { loginAdmin, loginDeliveryMan, loginUser, register } from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/register-user', register);

authRoutes.post('/login-admin', loginAdmin);

authRoutes.post('/login-user', loginUser);

authRoutes.post('/login-delivery-man', loginDeliveryMan);

export default authRoutes;