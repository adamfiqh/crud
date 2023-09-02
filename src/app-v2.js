// app-v2.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

// Koneksi ke MongoDB menggunakan Mongoose
mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  stock: Number,
  status: Boolean,
});

// Endpoint API v2
app.get("/api/v2/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Kesalahan mengambil produk (v2):", err);
    res.status(500).json({ error: "Kesalahan mengambil produk (v2)" });
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`Server v2 berjalan di port ${port}`);
});
