// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('signup req',req.body);
    const existingUser = await User.findOne({ email });
    console.log('existingUser',existingUser);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save().then(()=>console.log('signed up'));

    const token = jwt.sign({ id: newUser._id, isPremium: newUser.isPremium }, process.env.JWT_SECRET|| "862f7961aa890b55725c35dc58b5ecd75f9d31e760bbe3bc0c16ecdb854fd80de9293b21f5eb0ce408bdce1ecfe42e05557df6ef05f5075112c1be1ce9e4bd08");
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('req for login',req.body)
    const user = await User.findOne({ email });
    console.log('userFind',user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch',isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isPremium: user.isPremium }, process.env.JWT_SECRET|| "862f7961aa890b55725c35dc58b5ecd75f9d31e760bbe3bc0c16ecdb854fd80de9293b21f5eb0ce408bdce1ecfe42e05557df6ef05f5075112c1be1ce9e4bd08");
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


