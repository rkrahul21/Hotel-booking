'use client'


import Image from "next/image";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        const res = await fetch("/api/hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#fb610b' }}>Available Hotels</h1>
      {loading && <div className="text-center">Loading hotels...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <div className="w-full h-40 relative mb-4">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover  rounded-md bg-gray-100"
                // sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{hotel.name}</h2>
            <p className="text-gray-500 mb-2">{hotel.city}</p>
            <p className="text-lg font-medium mb-4">
              ₹{hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0].price : "-"}
              <span className="text-sm font-normal text-gray-400"> / night</span>
            </p>
            <Button
              className="w-full bg-[#fb610b] hover:bg-[#e25a0b] text-white border-none shadow-md"
              style={{ backgroundColor: '#fb610b', color: '#fff', border: 'none' }}
              onClick={() => router.push(`/Details?id=${hotel._id}`)}
            >
              See Detail
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
