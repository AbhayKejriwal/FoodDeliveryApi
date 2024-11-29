// Import mongoose
// Define schema:
//   - userId: ObjectId (reference to User model)
//   - foodItems: Array of ObjectId (reference to Food model)
//   - totalPrice: Number (calculated)
//   - status: String (enum: ['pending', 'accepted', 'completed'], default: 'pending')
//   - assignedDeliveryMan: ObjectId (reference to User model with 'delivery' role)
// Export the Order model

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    foodItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'],
        default: 'pending'
    },
    assignedDeliveryMan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Order = mongoose.model("Order", orderSchema);
export default Order;