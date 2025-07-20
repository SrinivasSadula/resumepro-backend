// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_2dn8T1ylFXoLcx",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "Lfe9GFhDHJIPfvWbXBnd1APW",
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 9900, // ₹99.00 in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const user = await User.findById(req.user.id);
      user.isPremium = true;
      await user.save();
      return res.status(200).json({ message: "Payment verified and user upgraded." });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

