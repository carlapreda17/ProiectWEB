const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const relations = require('./database/modelsRelations');
const userRoutes = require('./server/userRoutes');
const authRoutes = require('./server/authRoutes');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(3001, ()=> {
    console.log('Server listening on port 3001');
});