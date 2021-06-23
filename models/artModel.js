const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
  {
    title: String, // my first art
    description: String, // my short description
    cost: Number, // 295 dollar
    resolution: String, //1920 x 1080
    likes: Number, // 52
    reviews: [
      {
        content: String, //nice art
        reviewdBy: String, //123123
        rating: Number, // 3
      },
    ],
    gallery: Array, // ["abc.com", "xyz.con"]
    orientation: String, // landscape
    subject: String, //"night vission"
    formats: Array, // ["Jpg", "PSD", ai]
  },
  {
    timestamps: true,
  }
);



const Art = new mongoose.model("Art", artSchema);

module.exports = Art;
