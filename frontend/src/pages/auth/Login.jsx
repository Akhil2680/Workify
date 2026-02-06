import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { login as loginService } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (payload) => {
    const data = await loginService(payload);
    login({ token: data.token, user: data.user || { role: 'client' } });
    navigate('/');
  };

  return <div className="max-w-md mx-auto bg-white border rounded p-5"><h1 className="text-xl font-semibold mb-4">Login</h1><LoginForm onSubmit={handleLogin} /></div>;
};

export default Login;
