// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb://localhost:27017/db";

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Terhubung");
  })
  .catch((err) => {
    console.error("Kesalahan Koneksi MongoDB:", err);
  });

const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  stock: Number,
  status: Boolean,
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Kesalahan mengambil produk:", err);
    res.status(500).json({ error: "Kesalahan mengambil produk" });
  }
});

app.post("/api/products", async (req, res) => {
  const { name, price, stock, status } = req.body;

  const product = new Product({
    name,
    price,
    stock,
    status,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Kesalahan membuat produk:", err);
    res.status(400).json({ error: "Kesalahan membuat produk" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
