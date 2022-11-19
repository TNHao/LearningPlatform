import mongoose from "mongoose";

const useDatabase = () => {
  mongoose.connect(
    `mongodb+srv://learnhub:${process.env.DB_PASSWORD}@${process.env.DB_USERNAME}.slh7fe3.mongodb.net/?retryWrites=true&w=majority`
  );
  mongoose.connection.on("error", (err) => console.log(err));
  mongoose.connection
    .once("open", () => console.log("> MongoDB Running..."))
    .on("error", (e) => {
      throw e;
    });
};

export default useDatabase;
