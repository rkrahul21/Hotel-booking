import mongoose from "mongoose";
import connectDb from "./lib/connectDB.js";
import Hotel from "./models/Hotel.js";
import dotenv from 'dotenv';
dotenv.config();

const hotels = [
  {
    name: "Ocean View Resort",
    city: "Goa",
    place: "Calangute Beach",
    image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
    rooms: [
      { name: "Deluxe Sea View", price: 4500, available: true },
      { name: "Standard Room", price: 2800, available: true },
      { name: "Suite", price: 7000, available: false }
    ]
  },
  {
    name: "Mountain Escape Lodge",
    city: "Manali",
    place: "Old Manali",
    image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
    rooms: [
      { name: "Wooden Cabin", price: 3200, available: true },
      { name: "Luxury Suite", price: 5000, available: true }
    ]
  },
  {
    name: "Green Leaf Inn",
    city: "Munnar",
    place: "Tea Gardens",
    image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
    rooms: [
      { name: "Garden View Room", price: 3000, available: true },
      { name: "Eco Cottage", price: 4200, available: false }
    ]
  },
  
]




const seed = async () => {
  await connectDb();

  try {
    await Hotel.insertMany(hotels);
    console.log("✅ Hotels inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting hotels:", err);
  } finally {
    mongoose.disconnect();
  }
};

seed();