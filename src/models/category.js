import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },

  // Hiển thị tgian tạo / cập nhật và bỏ versionKey (_ _v) 
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Category", categorySchema);
