const BookingStatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-800',
    accepted: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return <span className={`px-2 py-1 rounded text-xs ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>;
};

export default BookingStatusBadge;
