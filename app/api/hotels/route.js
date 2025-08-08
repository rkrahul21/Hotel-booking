import connectDB from '@/lib/connectDB';
import Hotel from '@/models/Hotel';

export async function GET() {
  try {
    await connectDB();
    const hotels = await Hotel.find();
    return new Response(JSON.stringify(hotels), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
