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
  const [showPopup, setShowPopup] = useState(false);
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
          setShowPopup(true);
          // setUserName("");
          // setUserEmail("");
          // setCheckIn("");
          // setCheckOut("");
          // setGuests(1);
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
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => { setShowPopup(false); setCheckIn(""); setCheckOut(""); setGuests(1); }}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-2">
              <div className="text-green-600 text-3xl mb-2">✔</div>
              <h2 className="text-xl font-bold mb-2 text-center">Booking Confirmed!</h2>
              <div className="w-full text-left mb-2">
                <div><span className="font-semibold">Hotel:</span> {hotelName}</div>
                <div><span className="font-semibold">Room:</span> {roomName}</div>
                <div><span className="font-semibold">Check-in:</span> {checkIn}</div>
                <div><span className="font-semibold">Check-out:</span> {checkOut}</div>
                <div><span className="font-semibold">Guests:</span> {guests}</div>
              </div>
              <div className="text-green-700 font-medium text-center">Your booking has been successfully placed!</div>
            </div>
          </div>
        </div>
      )}
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

      <button type="submit" className="w-full bg-[#fb610b] hover:bg-[#e25a0b] text-white font-semibold py-2 rounded" disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>
    </form>
    </>
  );
}
