import mongoose from "mongoose";

/**
 * @typedef {Object} ConnectionObject
 * @property {Number} [isConnected]
 */
/** @type {{ isConnected?: Number }} */
const connection = {}


async function connectDb() {
    if(connection.isConnected){
        console.log("Already connected");
        return ;
    }


    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '') ;

        // console.log("datbase info",db);
        connection.isConnected = db.connections[0].readyState ;

        console.log("DATABASE Connected sucessfuly") ;
    } catch (error) {

        console.log("Connection failed",error)
        process.exit(1);
    }
}


export default connectDb ;

