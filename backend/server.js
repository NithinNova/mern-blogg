import path from "path";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true })); // to parse form data (urlencoded)

// Import routes
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import adminRoutes from './routes/admin.route.js';

// Use routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/admin', adminRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server

app.listen(port, () => console.log(`Server running on port ${port}`));
