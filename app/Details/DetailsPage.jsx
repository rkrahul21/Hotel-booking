"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import BookingForm from "../../components/shared/BookingForm";

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchHotel() {
      try {
        setLoading(true);
        const res = await fetch(`/api/hotels?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch hotel");
        const data = await res.json();
        setHotel(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchHotel();
  }, [id]);

  if (!id) return <div className="p-8 text-center">Missing hotel ID in URL.</div>;
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!hotel) return <div className="p-8 text-center">Hotel not found.</div>;

  return (
    <main className="w-full mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-[90%]  md:h-[450px] relative mb-2">
          {hotel.image ? (
  <Image
    src={hotel.image}
    alt={hotel.name}
    fill
    className="object-cover rounded bg-gray-100 "
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
    No Image Available
  </div>
)}
        </div>
        <h1 className="text-3xl font-bold mb-1 text-orange-600">{hotel.name}</h1>
        <p className="text-gray-500 mb-1">{hotel.city}</p>
        <p className="text-lg font-medium mb-2">{hotel.place}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-xl">Available Rooms</h2>
        <ul className="space-y-2">
          {hotel.rooms?.length > 0 ? (
            hotel.rooms.map((room, idx) => (
              <li key={room._id || idx} className="flex items-center justify-between border rounded p-2">
                <span>
                  <span className="font-medium">{room.name}</span> - ₹{room.price}
                  {!room.available && (
                    <span className="ml-2 text-red-500 text-xs">(Unavailable)</span>
                  )}
                </span>
                <Button
                  className="bg-[#fb610b] hover:bg-[#e25a0b] text-white px-3 py-1 text-sm"
                  disabled={!room.available}
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowForm(true);
                  }}
                >
                  Book This Room
                </Button>
              </li>
            ))
          ) : (
            <li>No rooms available.</li>
          )}
        </ul>
      </div>

      {showForm && selectedRoom && (
        <div className="w-full mt-10">
          <h3 className="flex flex-col gap-2 items-center text-orange-900 justify-center text-3xl font-bold mb-2">
            Book: {selectedRoom.name}
          </h3>
          <BookingForm hotelName={hotel.name} roomName={selectedRoom.name} />
        </div>
      )}
    </main>
  );
}
