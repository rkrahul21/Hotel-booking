import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  checkoutdate: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
