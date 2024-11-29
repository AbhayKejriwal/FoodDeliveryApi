// Import express Router and food.controller
// Define endpoints:
//   - GET /foods: Public
//   - POST /foods: Admin-only
//   - PUT /foods/:id: Admin-only
//   - DELETE /foods/:id: Admin-only
// Attach respective controller functions to routes

import express from 'express';
import { createFood, editFood, getAllFoods, removeFood } from '../controllers/foodController.js';

const foodRoutes = express.Router();

foodRoutes.get('/', getAllFoods);

foodRoutes.post('/', createFood);

foodRoutes.put('/:id', editFood);

foodRoutes.delete('/:id', removeFood);

export default foodRoutes;