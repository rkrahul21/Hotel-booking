import connectDB from '@/lib/connectDB';
import Hotel from '@/models/Hotel';

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    if (id) {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        return new Response(JSON.stringify({ error: 'Hotel not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(hotel), { status: 200 });
    } else {
      const hotels = await Hotel.find();
      return new Response(JSON.stringify(hotels), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
