import { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full border rounded px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="client">Client</option>
        <option value="worker">Worker</option>
      </select>
      <button className="w-full rounded bg-blue-600 text-white py-2">Register</button>
    </form>
  );
};

export default RegisterForm;
