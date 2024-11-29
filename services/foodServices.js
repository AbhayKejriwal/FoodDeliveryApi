// Define functions:
//   - fetchAllFoods: Query Food model
//   - addFood: Create new food item
//   - updateFood: Find food by ID and update
//   - deleteFood: Find food by ID and remove

import Food from '../models/foodModel.js';

export const fetchAllFoods = async () => {
  return await Food.find();
}

export const addFood = async (food) => {
  const newFood = new Food(food);
  return await newFood.save();
}

export const updateFood = async (id, food) => {
  return await Food.findByIdAndUpdate(id, food, { new: true });
}

export const deleteFood = async (id) => {
  return await Food.findByIdAndRemove(id);
}