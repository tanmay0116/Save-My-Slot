const express= require('express')
const morgan= require('morgan')
const colors=require('colors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors=require('cors')
dotenv.config();

connectDB();
const app=express()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/',require('./routes/userRoutes'));
app.use('/admin',require('./routes/adminRoutes'))
app.use('/doctor',require('./routes/doctorRoutes'))
const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log(`server is running on ${process.env.NODE_MODE} and on ${port} port`.bgCyan.white )});