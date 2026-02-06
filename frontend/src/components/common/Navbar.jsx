import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">Workify</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/workers">Workers</Link>
          {isAuthenticated ? (
            <>
              <span className="text-slate-500">{user?.role}</span>
              <button className="px-3 py-1 rounded bg-slate-800 text-white" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
