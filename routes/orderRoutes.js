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

const orderRoutes = express.Router();

orderRoutes.post('/', (req, res) => {
    res.send('Create order');
    }
);

orderRoutes.get('/', (req, res) => {
    res.send('Get all orders');
    }
);

orderRoutes.get('/:id', (req, res) => {
    res.send('Get order details');
    }
);

orderRoutes.put('/:id/status', (req, res) => {
    res.send('Update order status');
    }
);

orderRoutes.get('/assigned', (req, res) => {
    res.send('Get assigned orders');
    }
);

orderRoutes.put('/:id/delivered', (req, res) => {
    res.send('Update order status to delivered');
})

export default orderRoutes;
