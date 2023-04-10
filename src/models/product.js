import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    //Tạo liên kết sản phẩm (product) với danh mục(category)
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },

  // Hiển thị tgian tạo / cập nhật và bỏ versionKey (_ _v)
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
