import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: "String",
    required: true,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

const UserCollection = new mongoose.model("User", userSchema);

export default UserCollection;
