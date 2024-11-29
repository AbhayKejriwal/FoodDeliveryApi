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
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const orderRoutes = express.Router();

orderRoutes.post('/', authenticate, authorize("admin", "user"), placeOrder);

orderRoutes.get('/', authenticate, authorize("admin"), getAllOrders);

orderRoutes.get('/:id', authenticate, authorize("admin", "user"), getOrderDetails);

orderRoutes.put('/:id/status', authenticate, authorize("admin"), updateOrderStatus);

//delivery man routes
orderRoutes.get('/assigned', authenticate, authorize("delivery"), getAssignedOrders);

orderRoutes.put('/:id/delivered', authenticate, authorize("delivery"), updateOrderDelivered)

export default orderRoutes;
