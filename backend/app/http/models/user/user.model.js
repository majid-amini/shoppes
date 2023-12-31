const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productID: { type: mongoose.Types.ObjectId, ref: "products" },
  count: { type: Number, default: 1 },
});

const BasketSchema = new mongoose.Schema({
  products: { type: [ProductSchema], default: [] },
});

const schema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    birthday: { type: String },
    token: { type: String, default: "" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    basket: { type: BasketSchema },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const userSchema = schema;

userSchema.index({
  first_name: "text",
  last_name: "text",
  username: "text",
  mobile: "text",
  email: "text",
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
