import User from '../models/user.model.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Register User
export const register = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.send('User registered');
};


// Login User
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send('Password reset successfully');
  } catch (error) {
    res.status(500).send('Error resetting password');
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    // Extract the user ID from the token (assuming you're verifying the token in middleware)
    const userId = req.userId; // Assuming req.userId is set by the auth middleware

    // Update the user's status to 'logged out'
    await User.findByIdAndUpdate(userId, { status: 'logged out' });

    res.json({
      message: 'Logout successful.',
    });
  } catch (error) {
    res.status(500).send('Error during logout');
  }
};


// Get All Users (Admin Feature)
export const getAllUsers = async (req, res) => {
  try {
    // Fetch only users whose status is 'active'
    const users = await User.find({ status: 'active' });

    res.json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};


