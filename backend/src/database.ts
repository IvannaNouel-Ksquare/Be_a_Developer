import "dotenv/config";
import mongoose from 'mongoose';

const URI = process.env.DB_URI as string;

const connect = () =>{
    mongoose.connect(URI)
    .then(()=> console.log("Database connected"))
    .catch((error) => console.log(error))    
}

export default {
    connect
}

