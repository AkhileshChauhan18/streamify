require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require('./routes/auth_routes');
const conn = require('./lib/db');
app.use("/auth",router);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  port ${process.env.PORT}`);
})
