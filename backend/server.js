const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.use('/api/expenses', expenseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
