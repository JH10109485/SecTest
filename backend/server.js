
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const app = express();
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;




const httpsOptions = {
  key: fs.readFileSync('C:/Users/Ethan/Desktop/APDS VS SWIFT/backend/keys/localhost-key.pem'),
  cert: fs.readFileSync('C:/Users/Ethan/Desktop/APDS VS SWIFT/backend/keys/localhost.pem')
};


app.use(express.json());

const corsOptions = {
  origin: 'https://localhost:3001', 
  credentials: true, 
};
app.use(cors(corsOptions));



app.use('/api/users', userRoutes);

//MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

//Start the HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});






