import connectDB from '@/lib/connectDB';
import Booking from '@/models/Booking';

export async function POST(req) {
  try {
    const body = await req.json();
    const { hotelName, userName, userEmail, roomName, startdate, checkoutdate, guests } = body;
    if (!hotelName || !userName || !userEmail || !roomName || !startdate || !checkoutdate || !guests) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }
    await connectDB();
    const booking = new Booking({ hotelName, userName, userEmail, roomName, startdate, checkoutdate, guests });
    await booking.save();
    return new Response(JSON.stringify({ message: 'Booking saved successfully.' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
