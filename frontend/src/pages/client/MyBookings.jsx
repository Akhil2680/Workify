import { useEffect, useState } from 'react';
import { getClientBookings } from '../../services/bookingService';
import BookingCard from '../../components/booking/BookingCard';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getClientBookings().then((res) => setBookings(res || []));
  }, []);

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">My Bookings</h1>
      {bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
    </section>
  );
};

export default MyBookings;
