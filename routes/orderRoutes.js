// Import express Router and order.controller
// Define endpoints:
//   - POST /orders: Place a new order.
//   - GET /orders: View all orders (Admin only)
//   - GET /orders/:id: View order details.
//   - PUT /orders/:id/status: Update order status (Admin)
//   - GET /orders/assigned: View orders assigned to a delivery man (by Delivery Man id)
//   - PUT /orders/:id/delivered: Delivery Man marks an order as delivered (by DeliveryMan)
// Attach respective controller functions to routes

import express from 'express';
import { getAllOrders, getAssignedOrders, getOrderDetails, placeOrder, updateOrderDelivered, updateOrderStatus } from '../controllers/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post('/', placeOrder);

orderRoutes.get('/', getAllOrders);

orderRoutes.get('/:id', getOrderDetails);

orderRoutes.put('/:id/status', updateOrderStatus);

//delivery man routes
orderRoutes.get('/assigned', getAssignedOrders);

orderRoutes.put('/:id/delivered', updateOrderDelivered)

export default orderRoutes;
