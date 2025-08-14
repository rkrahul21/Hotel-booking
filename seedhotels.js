import mongoose from "mongoose";
import connectDb from "./lib/connectDB.js";
import Hotel from "./models/Hotel.js";
import dotenv from 'dotenv';
dotenv.config();

// const hotels = [
//   {
//     name: "Ocean View Resort",
//     city: "Goa",
//     place: "Calangute Beach",
//     image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
//     rooms: [
//       { name: "Deluxe Sea View", price: 4500, available: true },
//       { name: "Standard Room", price: 2800, available: true },
//       { name: "Suite", price: 7000, available: false }
//     ]
//   },
//   {
//     name: "Mountain Escape Lodge",
//     city: "Manali",
//     place: "Old Manali",
//     image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
//     rooms: [
//       { name: "Wooden Cabin", price: 3200, available: true },
//       { name: "Luxury Suite", price: 5000, available: true }
//     ]
//   },
//   {
//     name: "Green Leaf Inn",
//     city: "Munnar",
//     place: "Tea Gardens",
//     image: "https://www.pexels.com/photo/scenic-venetian-bridge-and-historic-architecture-31448898/",
//     rooms: [
//       { name: "Garden View Room", price: 3000, available: true },
//       { name: "Eco Cottage", price: 4200, available: false }
//     ]
//   },
  
// ]

const hotels = [
  {
    name: "Ocean View Resort",
    city: "Goa",
    place: "Calangute Beach",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg", 
    rooms: [
      { name: "Deluxe Sea View", price: 4500, available: true },
      { name: "Standard Room", price: 2800, available: true },
      { name: "Suite", price: 7000, available: false }
    ]
  },
  {
    name: "Candolim Poolside Retreat",
    city: "Goa",
    place: "Candolim",
    image: "https://images.pexels.com/photos/13585378/pexels-photo-13585378.jpeg", 
    rooms: [
      { name: "Pool Villa", price: 5200, available: true },
      { name: "Garden View Room", price: 3300, available: true }
    ]
  },
  {
    name: "Palm Grove Resort",
    city: "Goa",
    place: "Baga Beach",
    image: "https://images.pexels.com/photos/9228503/pexels-photo-9228503.jpeg",
    rooms: [
      { name: "Garden Suite", price: 4800, available: true },
      { name: "Family Room", price: 6000, available: false }
    ]
  },
  {
    name: "Heritage Palace Hotel",
    city: "Udaipur",
    place: "City Palace",
    image: "https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg",
    rooms: [
      { name: "Imperial Suite", price: 12000, available: true },
      { name: "Deluxe Heritage Room", price: 8000, available: true }
    ]
  },
  {
    name: "Spice Plantation Cottage",
    city: "Munnar",
    place: "Tea Gardens",
    image: "https://images.pexels.com/photos/13585378/pexels-photo-13585378.jpeg",  
    rooms: [
      { name: "Cottage Deluxe", price: 3500, available: true },
      { name: "Estate View Room", price: 4200, available: false }
    ]
  },
  {
    name: "Mountain Escape Lodge",
    city: "Manali",
    place: "Old Manali",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg", 
    rooms: [
      { name: "Wooden Cabin", price: 3200, available: true },
      { name: "Luxury Suite", price: 5000, available: true }
    ]
  },
  {
    name: "Tea Garden Haven",
    city: "Darjeeling",
    place: "Tea Estates",
    image: "https://images.pexels.com/photos/9228503/pexels-photo-9228503.jpeg", 
    rooms: [
      { name: "Estate View Room", price: 4200, available: true },
      { name: "Luxury Cottage", price: 6100, available: true }
    ]
  },
  {
    name: "Lakefront Luxury Inn",
    city: "Udaipur",
    place: "Lake Pichola",
    image: "https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg", 
    rooms: [
      { name: "Royal Lake View", price: 9500, available: true },
      { name: "Heritage Suite", price: 11000, available: false }
    ]
  },
  {
    name: "Tropical Beachfront Escape",
    city: "Goa",
    place: "Palolem Beach",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg", 
    rooms: [
      { name: "Beachfront Deluxe", price: 6200, available: true },
      { name: "Coconut Grove Room", price: 4800, available: false }
    ]
  },
  {
    name: "Royal Fort Palace",
    city: "Jodhpur",
    place: "Mehrangarh Fort",
    image: "https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg", 
    rooms: [
      { name: "Fort View Suite", price: 8300, available: true },
      { name: "Heritage Room", price: 6800, available: true }
    ]
  },
  {
    name: "Riverfront Riverside Inn",
    city: "Rishikesh",
    place: "Ganges Banks",
    image: "https://images.pexels.com/photos/13585378/pexels-photo-13585378.jpeg", 
    rooms: [
      { name: "Ganges Suite", price: 4900, available: true },
      { name: "Standard River View", price: 3500, available: false }
    ]
  },
  {
    name: "Desert Oasis Resort",
    city: "Jaisalmer",
    place: "Sand Dunes",
    image: "https://images.pexels.com/photos/32262471/pexels-photo-32262471.jpeg", 
    rooms: [
      { name: "Sand Dune Suite", price: 5200, available: false },
      { name: "Oasis Room", price: 3800, available: true }
    ]
  }
];


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