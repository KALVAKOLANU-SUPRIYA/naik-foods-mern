const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET products with search, filter and sorting
router.get("/", async (req, res) => {
  try {
    const { search, category, maxPrice, sort } = req.query;

    // Build MongoDB filter
    const filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Filter by maximum price
    if (maxPrice) {
      filter.price = {
        $lte: Number(maxPrice),
      };
    }

    // Start query
    let query = Product.find(filter);

    // Sorting
    if (sort === "price-low") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price-high") {
      query = query.sort({ price: -1 });
    }

    if (sort === "rating") {
      query = query.sort({ rating: -1 });
    }

    const products = await query;

    res.json(products);

  } catch (error) {

    console.error("ERROR FETCHING PRODUCTS:");
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

module.exports = router;