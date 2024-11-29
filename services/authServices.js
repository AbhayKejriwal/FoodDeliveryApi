// Define functions:
//   - validateCredentials: Compare hashed passwords using bcrypt
//   - validateRole: Check if role is valid
//   - fetchUser: Fetch users by email
//   - createUser: Create a new user

import User from '../models/userModel.js';

export const validateCredentials = async (email, password, role) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)) || user.role !== role) {
    return false;
  }
  return user;  
}

export const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
}