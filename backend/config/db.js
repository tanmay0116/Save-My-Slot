const mongoose=require('mongoose')
const colors=require('colors')
const connectDB=async()=>{
        try{
            await mongoose.connect('mongodb://0.0.0.0:27017/information');
            console.log(`Mongodb connected`.bgGreen.white);
        }
        catch(error)
        {
            console.log(`Mongodb servewr issue ${error}`.bgRed.white);
        }
};

module.exports =connectDB;
