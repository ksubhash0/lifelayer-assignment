require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path')


//routes import
const routes = require('./routes')


const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 4003;


app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(express.json({limit: '8mb'}));
app.use(cookieParser())



app.use('/api', routes)

app.use('/' , express.static('app'));
app.use('/uploads', express.static('uploads'))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'index.html'))
});

mongoose.connect('mongodb://localhost:27017/lifelayer-assignment').then(() => {

app.listen(PORT, () => {
    console.log('app is listening')
})
})