import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookWorker } from '../../services/bookingService';

const BookWorker = () => {
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bookWorker(id, { bookingDate, hours: Number(hours) });
    alert('Booking created');
  };

  return (
    <form className="max-w-md bg-white border rounded p-5 space-y-3" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold">Book Worker #{id}</h1>
      <input type="datetime-local" className="w-full border rounded px-3 py-2" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
      <input type="number" min="1" max="24" className="w-full border rounded px-3 py-2" value={hours} onChange={(e) => setHours(e.target.value)} required />
      <button className="w-full rounded bg-blue-600 text-white py-2">Confirm Booking</button>
    </form>
  );
};

export default BookWorker;
