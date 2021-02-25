import mongoose from "mongoose";

const connecttoDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((con) => {
      console.log(`MongoDb is connected with HOST: ${con.connection.host}`);
    });
};

export default connecttoDatabase;
