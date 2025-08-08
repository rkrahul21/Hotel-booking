// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import BookingForm from "./BookingForm";

// // Dummy room data for demonstration
// const dummyRooms = [
//   { id: 1, name: "Deluxe Suite", price: 250, available: true },
//   { id: 2, name: "Standard Room", price: 180, available: true },
//   { id: 3, name: "Single Room", price: 120, available: false },
// ];

// export default function HotelDetailsModal() {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   if (!hotel) return null;

//   return (
//     <div className=" flex items-center justify-center bg-yellow-600">
//       <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
//         <button
//           className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <div className="flex flex-col items-center mb-4">
//           <div className="w-48 h-32 relative mb-2">
//             <Image src={hotel.image} alt={hotel.name} fill className="object-contain rounded bg-gray-100" />
//           </div>
//           <h2 className="text-2xl font-bold mb-1" style={{ color: '#fb610b' }}>{hotel.name}</h2>
//           <p className="text-gray-500 mb-1">{hotel.city}</p>
//           <p className="text-lg font-medium mb-2">From ${hotel.price} / night</p>
//         </div>
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Available Rooms</h3>
//           <ul className="space-y-2">
//             {dummyRooms.map(room => (
//               <li key={room.id} className="flex items-center justify-between border rounded p-2">
//                 <span>
//                   <span className="font-medium">{room.name}</span> - ${room.price}
//                   {!room.available && <span className="ml-2 text-red-500 text-xs">(Unavailable)</span>}
//                 </span>
//                 <Button
//                   className="bg-[#fb610b] hover:bg-[#e25a0b] text-white px-3 py-1 text-sm"
//                   disabled={!room.available}
//                   onClick={() => { setSelectedRoom(room); setShowForm(true); }}
//                 >
//                   Book This Room
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* {showForm && selectedRoom && (
//           <div className=" bg-red-600 mt-8 flex flex-col items-center justify-center text-4xl font-bold">
//             <h4 className="font-semibold mb-20 justify-center text-4xl ">Book: {selectedRoom.name}</h4>
//             <BookingForm onSubmit={(data) => { alert(`Booking for ${selectedRoom.name} submitted!`); setShowForm(false); }} />
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }
