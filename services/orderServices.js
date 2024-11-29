// Define functions:
//   - createOrder: Save new order to the database
//   - fetchAllOrders: Get all orders from the database
//   - fetchOrderDetails: Find order by ID
//   - markOrderStatus: Update status of an order
//   - fetchAssignedOrders: Find orders assigned to a delivery man

import Order from '../models/orderModel.js';
import Food from '../models/foodModel.js';
import User from '../models/userModel.js';

export const createOrder = async (order) => {
    // create a new order but also populate the food items and randomly assign a delivery man
    // the order variable will only have foodItems ids and userId
    // fetch the food items from food model and calculate the total price
    // and then randomly assign a delivery 
    const { foodItems, userId } = order;
    const foodItemsDetails = await Food.find({ _id: { $in: foodItems } });
    const totalPrice = foodItemsDetails.reduce((acc, item) => acc + item.price, 0);
    const deliveryMen = await User.find({ role: 'delivery' });
    const randomIndex = Math.floor(Math.random() * deliveryMen.length);
    const assignedDeliveryMan = deliveryMen[randomIndex];
    return await Order.create({ foodItems, userId, totalPrice, assignedDeliveryMan: assignedDeliveryMan._id });
}

export const fetchAllOrders = async () => {
    return await Order.find()
    .populate({
        path: 'foodItems',
        select: 'name price'
    }).populate({
        path: 'assignedDeliveryMan',
        select: 'username'
    });
}

export const fetchOrderDetails = async (id) => {
    return await Order.findById(id)
    .populate({
        path: 'foodItems',
        select: 'username price'
    }).populate({
        path: 'assignedDeliveryMan',
        select: 'username'
    });
}

export const markOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
}

export const fetchAssignedOrders = async (deliveryManId) => {
    return await Order.find({ assignedDeliveryMan: deliveryManId })
    .populate({
        path: 'foodItems',
        select: 'name price'
    }).populate({
        path: 'assignedDeliveryMan',
        select: 'username'
    });;
}