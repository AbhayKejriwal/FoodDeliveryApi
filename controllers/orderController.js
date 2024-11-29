// Import order.service
// Define functions:
//   - placeOrder: Validate request, call order.service, and return result
//   - getAllOrders: Validate admin role, call order.service, and return result
//   - getOrderDetails: Fetch order by ID, validate user access, and return result
//   - updateOrderStatus: Validate admin role, call order.service, and return result
//   - getAssignedOrders: Fetch orders assigned to a delivery
//   - updateOrderDelivered: Update order status to delivered

import { createOrder, fetchAllOrders, fetchOrderDetails, fetchAssignedOrders, markOrderStatus } from '../services/orderServices.js';

export const placeOrder = async (req, res) => {
    try {
        const order = req.body;
        order.userId = req.userDetails._id;
        const newOrder = await createOrder(order);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await fetchAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrderDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userDetails._id;
        const order = await fetchOrderDetails(id);
        if(order.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You can only see your orders' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const updatedOrder = await markOrderStatus(id, status);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAssignedOrders = async (req, res) => {
    try {
        const deliveryManId = req.userDetails._id;
        const orders = await fetchAssignedOrders(deliveryManId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateOrderDelivered = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status = 'completed';
        const order = await fetchOrderDetails(orderId);
        if(order.assignedDeliveryMan._id.toString() !== req.userDetails._id) {
            return res.status(403).json({ message: 'You can only update orders assigned to you' });
        }
        const completedOrder = await markOrderStatus(orderId, status);
        res.status(200).json(completedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}