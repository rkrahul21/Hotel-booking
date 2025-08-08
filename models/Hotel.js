import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Price in INR
  available: { type: Boolean, default: true },
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  place: { type: String, required: true },
  image: { type: String },
  rooms: [RoomSchema],
}, { timestamps: true });

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);

