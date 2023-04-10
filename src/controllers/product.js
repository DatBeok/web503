import Product from "../models/product.js";
import joi from "joi";

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  categoryId: joi.string().required(),
});

export const getAll = async (req, res) => {
  const {_limit = 4, _page = 1, _sort = "createdAt", _order = "desc"} = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  }
  try {
    const data = await Product.paginate({},options);
    console.log(data);
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("categoryId");

    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    // const { data } = await axios.post(`http://localhost:3000/products`, req.body);
    const data = await Product.create(req.body);
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không thêm được sản phẩm",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { data } = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data.length === 0) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id, req.body);
    return res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
