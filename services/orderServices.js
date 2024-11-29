// Define functions:
//   - createOrder: Save new order to the database
//   - fetchAllOrders: Get all orders from the database
//   - fetchOrderDetails: Find order by ID
//   - updateOrderStatus: Update status of an order
//   - getAssignedOrders: Find orders assigned to a delivery man

import Order from '../models/orderModel';

export const createOrder = async (order) => {
    return await Order.create(order);
}

export const fetchAllOrders = async () => {
    return await Order.find();
}

export const fetchOrderDetails = async (id) => {
    return await Order.findById(id);
}

export const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
}

export const getAssignedOrders = async (deliveryManId) => {
    return await Order.find({ assignedDeliveryMan: deliveryManId });
}