import { useEffect, useState } from 'react';
import WorkerList from '../../components/worker/WorkerList';
import { getWorkers } from '../../services/workerService';

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getWorkers().then((res) => setWorkers(res.workers || res || []));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Available Workers</h1>
      <WorkerList workers={workers} />
    </div>
  );
};

export default Workers;
