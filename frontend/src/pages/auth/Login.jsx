import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';
import { login as loginService } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (payload) => {
    try {
      const data = await loginService(payload);
      login({ token: data.token, user: data.user || { role: 'client' } });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <User className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
        <p className="text-slate-500 mb-8 text-center">Sign in to your account</p>

        <LoginForm onSubmit={handleLogin} />

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Don't have an account? {' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

