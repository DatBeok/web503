import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../schemas/auth";

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Kiểm tra xem user đã đk chưa?
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Tao token
    const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

    // không trả về password
    user.password = undefined;

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signinSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Ktra xem user da dky chua

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email ko ton tai",
      });
    }

    // So sanh mat khau

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mat khau ko dung",
      });
    }

    const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

    user.password = undefined;

    return res.status(200).json({
      message: "Dang nhap thanh cong",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
