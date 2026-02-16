import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Layers className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-slate-800">ServiceConnect</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/workers" className="hover:text-primary transition-colors">Services</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-800">{user?.name || 'User'}</span>
                <span className="text-xs text-slate-500 capitalize">{user?.role}</span>
              </div>
              <button
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-[15px] font-medium text-slate-600 hover:text-primary">Login</Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

