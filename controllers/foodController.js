// Import food.service
// Define functions:
//   - getAllFoods: Fetch all food items and return
//   - createFood: Validate request, call food.service, and return result
//   - editFood: Validate request, call food.service, and return result
//   - removeFood: Validate request, call food.service, and return result

import { fetchAllFoods, addFood, updateFood, deleteFood } from '../services/foodServices.js';

export const getAllFoods = async (req, res) => {
  try {
    const foods = await fetchAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createFood = async (req, res) => {
    
    try {
        const food = req.body;
        const newFood = await addFood(food);
        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editFood = async (req, res) => {
    const { id } = req.params;
    const food = req.body;
    try {
        const updatedFood = await updateFood(id, food);
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const removeFood = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFood(id);
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}