// Import mongoose
// Define schema:
//   - name: String (required)
//   - description: String
//   - price: Number (required)
//   - category: String
// Export the Food model

import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String 
    }
});

const Food = mongoose.model("Food", foodSchema);

export default Food;