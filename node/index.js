const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const userRoutes = require('./server/userRoutes');

app.use('/users', userRoutes);

app.listen(3001, ()=> {
    console.log('Server listening on port 3001');
});