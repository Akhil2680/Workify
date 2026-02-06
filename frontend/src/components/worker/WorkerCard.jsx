import { Link } from 'react-router-dom';

const WorkerCard = ({ worker }) => (
  <article className="border rounded-lg p-4 bg-white">
    <h3 className="font-semibold">{worker.name}</h3>
    <p className="text-sm text-slate-600">{worker.service_type} • {worker.location}</p>
    <p className="text-sm">⭐ {worker.average_rating ?? 0} ({worker.total_reviews ?? 0} reviews)</p>
    <Link className="inline-block mt-3 text-blue-600" to={`/book/${worker.id}`}>Book Worker</Link>
  </article>
);

export default WorkerCard;
