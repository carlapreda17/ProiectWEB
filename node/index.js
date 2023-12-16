const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors);


app.post('/api/signUp', (req, res) => {
    try {
        const formData = req.body;
        console.log(formData);

        res.json({ success: true, message: 'Data logged' });
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.listen(3001, ()=> {
    console.log('Server listening on port 3001');
});