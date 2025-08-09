'use client'
import React, { useState } from "react";

export default function BookingForm({ hotelName = "", roomName = "" }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!userName) newErrors.userName = "Name is required.";
    if (!userEmail) newErrors.userEmail = "Email is required.";
    if (!checkIn) newErrors.checkIn = "Check-in date is required.";
    if (!checkOut) newErrors.checkOut = "Check-out date is required.";
    if (checkIn && checkOut && checkIn > checkOut) newErrors.checkOut = "Check-out must be after check-in.";
    if (!guests || guests < 1) newErrors.guests = "At least 1 guest required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (validate()) {
      setLoading(true);
      try {
        const res = await fetch("/api/booking-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hotelName,
            userName,
            userEmail,
            roomName,
            startdate: checkIn,
            checkoutdate: checkOut,
            guests,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess("Booking saved successfully!");
          setUserName("");
          setUserEmail("");
          setCheckIn("");
          setCheckOut("");
          setGuests(1);
        } else {
          setErrors({ api: data.error || "Something went wrong." });
        }
      } catch (err) {
        setErrors({ api: "Network error." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
  <form onSubmit={handleSubmit} className="w-full space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto">
      <div>
        <label className="block font-medium mb-1">Your Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Your Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Check-in Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
        />
        {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Check-out Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
        />
        {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Number of Guests</label>
        <input
          type="number"
          min="1"
          className="border rounded px-3 py-2 w-full"
          value={guests}
          onChange={e => setGuests(Number(e.target.value))}
        />
        {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
      </div>
      {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}
      {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
      <button type="submit" className="w-full bg-[#fb610b] hover:bg-[#e25a0b] text-white font-semibold py-2 rounded" disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>
    </form>
  );
}
