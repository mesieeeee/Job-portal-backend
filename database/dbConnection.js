import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "job",
    }).then(() => {
        console.log("connected to database");
    }).catch(() => {
        console.log(`some error cooured while connecting to database: ${err}`)
    })
}