// Import express Router and food.controller
// Define endpoints:
//   - GET /foods: Public
//   - POST /foods: Admin-only
//   - PUT /foods/:id: Admin-only
//   - DELETE /foods/:id: Admin-only
// Attach respective controller functions to routes

import express from 'express';
import { createFood, editFood, getAllFoods, removeFood } from '../controllers/foodController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const foodRoutes = express.Router();

foodRoutes.get('/', authenticate, getAllFoods);

foodRoutes.post('/', authenticate, authorize("admin"), createFood);

foodRoutes.put('/:id', authenticate, authorize("admin"),  editFood);

foodRoutes.delete('/:id', authenticate, authorize("admin"),  removeFood);

export default foodRoutes;