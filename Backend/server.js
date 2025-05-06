const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typingRoutes = require('./routes/typingRoutes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // or your frontend port
  credentials: true
}));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/api/typing', typingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
