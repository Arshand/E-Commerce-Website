const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
