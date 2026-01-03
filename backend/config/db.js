const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      "mongodb+srv://dayflow_db_user:dayflowodoo@dayflowhrms.qeu39cn.mongodb.net/dayflow_hrms";
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
