const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', require('./users'));
app.use('/listings', require('./listings'));

app.listen(3000, function() {
    console.log('Server listening on port 3000')
})