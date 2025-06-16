require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/connect-db');
const router = require('./routes');
const cookiesParser = require('cookie-parser');

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json('Hello worldd');
});

// API endpoints
app.use('/api', router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server running at', PORT);
  });
});
