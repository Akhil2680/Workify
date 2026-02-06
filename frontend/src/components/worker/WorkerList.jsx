import WorkerCard from './WorkerCard';

const WorkerList = ({ workers = [] }) => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {workers.map((worker) => (
      <WorkerCard key={worker.id} worker={worker} />
    ))}
  </section>
);

export default WorkerList;
