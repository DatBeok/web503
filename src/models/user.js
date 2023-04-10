import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "member",
    },
  },

  // Hiển thị tgian tạo / cập nhật và bỏ versionKey (_ _v)
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
