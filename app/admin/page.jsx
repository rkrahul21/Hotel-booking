"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ availableRooms: [], bookedRooms: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin-dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl text-[#fb610b] font-bold mb-8 text-center" >Admin Dashboard</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <h2 className="  text-2xl font-semibold mb-4 mt-8">Available Rooms</h2>
          <div className="bg-[#e2d0c5] overflow-x-auto mb-8">
            <table className="min-w-full border text-sm">
              <thead className="text-lg">
                <tr className="bg-[#cf5712]">
                  <th className="px-4 py-2 border">Hotel</th>
                  <th className="px-4 py-2 border">Room</th>
                  <th className="px-4 py-2 border">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {stats.availableRooms.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-2">No available rooms</td></tr>
                )}
                {stats.availableRooms.map((room, idx) => (
                  <tr key={idx} className="border-b ">
                    <td className="px-4 py-2 border">{room.hotelName}</td>
                    <td className="px-4 py-2 border ">{room.roomName}</td>
                    <td className="px-4 py-2 border flex  justify-center">{room.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Booked Rooms</h2>
          <div className="bg-[#e2d0c5] overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr className="bg-[#cf5712]">
                  <th className="px-4 py-2 border">Hotel</th>
                  <th className="px-4 py-2 border">Room</th>
                  <th className="px-4 py-2 border">Booked By</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">From</th>
                  <th className="px-4 py-2 border">To</th>
                </tr>
              </thead>
              <tbody>
                {stats.bookedRooms.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-2">No bookings</td></tr>
                )}
                {stats.bookedRooms.map((b, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-2 border">{b.hotelName}</td>
                    <td className="px-4 py-2 border">{b.roomName}</td>
                    <td className="px-4 py-2 border">{b.userName}</td>
                    <td className="px-4 py-2 border">{b.userEmail}</td>
                    <td className="px-4 py-2 border">{b.startdate ? new Date(b.startdate).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-2 border">{b.checkoutdate ? new Date(b.checkoutdate).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}