const express = require('express');
const cors = require('cors');
const {join} = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const relations = require('./database/modelsRelations');
const userRoutes = require('./server/userRoutes');
const authRoutes = require('./server/authRoutes');
const dataRoutes = require('./server/dataRoutes');
const notesRoutes=require('./server/notesRoutes');

app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/info', dataRoutes);
app.use('/notes', notesRoutes);

app.listen(3001, ()=> {
    console.log('Server listening on port 3001');
});