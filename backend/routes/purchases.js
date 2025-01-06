const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Create a new purchase
router.post('/', async (req, res) => {
  const purchase = new Purchase({
    productId: req.body.productId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    quantity: req.body.quantity,
    purchaseDate: new Date()
  });

  try {
    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
