import connectDB from '@/lib/connectDB';
import Booking from '@/models/Booking';
import Hotel   from '@/models/Hotel';



export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ bookings, hotels }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}








