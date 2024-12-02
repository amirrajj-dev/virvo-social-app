import mongoose from "mongoose";
const connectToDb = async ()=>{
    if (mongoose.connections[0].readyState){
        console.log('already connected to db');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>console.log('connected to db Succesfully✅🤖'))
    } catch (error) {
        console.log('sth goes wrong connection to db => ' , error.message);
        process.exit(1)
    }
}

export default connectToDb;