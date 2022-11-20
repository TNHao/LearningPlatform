import mongoose from "mongoose";
 
const useDatabase = () => {
  const { DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

  mongoose.connect(
    `mongodb+srv://learnhub:${DB_PASSWORD}@${DB_USERNAME}.slh7fe3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  );
  mongoose.connection.on("error", (err) => console.log(err));
  mongoose.connection
    .once("open", () => console.log("> MongoDB Running..."))
    .on("error", (e) => {
      throw e;
    });
};

export default useDatabase;
