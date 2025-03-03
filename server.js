// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/donations", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Donation Schema
const donationSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: Number,
    paymentMethod: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);

// Route to submit a donation
app.post("/donate", async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).json({ message: "Donation Successful!", donation });
    } catch (error) {
        res.status(500).json({ message: "Error saving donation", error });
    }
});

// Route to get total donation amount
app.get("/total-donations", async (req, res) => {
    try {
        const total = await Donation.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$amount" } } }]);
        res.json({ totalAmount: total.length ? total[0].totalAmount : 0 });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total donations", error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
