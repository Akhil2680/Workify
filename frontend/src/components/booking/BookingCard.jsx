import { formatDate } from '../../utils/formatDate';
import BookingStatusBadge from './BookingStatusBadge';

const BookingCard = ({ booking }) => (
  <article className="border rounded-lg p-4 bg-white flex justify-between items-start">
    <div>
      <p className="font-medium">Booking #{booking.id}</p>
      <p className="text-sm text-slate-600">Date: {formatDate(booking.booking_date)}</p>
      <p className="text-sm text-slate-600">Hours: {booking.hours}</p>
    </div>
    <BookingStatusBadge status={booking.booking_status} />
  </article>
);

export default BookingCard;
