import connectDB from '@/lib/connectDB';
import Booking from '@/models/Booking';
import Hotel from '@/models/Hotel';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find();
    const hotels = await Hotel.find();
    let availableRooms = [];
    hotels.forEach(hotel => {
      hotel.rooms.forEach(room => {
        if (room.available) {
          availableRooms.push({
            hotelName: hotel.name,
            roomName: room.name,
            price: room.price
          });
        }
      });
    });
    let bookedRooms = bookings.map(b => ({
      hotelName: b.hotelName,
      roomName: b.roomName,
      startdate: b.startdate,
      checkoutdate: b.checkoutdate,
      userName: b.userName,
      userEmail: b.userEmail
    }));
    return new Response(JSON.stringify({
      availableRooms,
      bookedRooms
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
