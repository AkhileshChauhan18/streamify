const mongoose=require('mongoose');
const database = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.error("Database connection failed:", err);  
}
);


module.exports = database;