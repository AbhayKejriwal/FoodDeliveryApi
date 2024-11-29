// Import mongoose
// Define schema:
//   - name: String (required)
//   - email: String (required, unique)
//   - password: String (hashed)
//   - role: String (enum: ['admin', 'user', 'delivery'], default: 'user')
// Export the User model

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'delivery'],
        default: 'user'
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip hashing if the password isn't modified

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;