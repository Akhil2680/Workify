import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { register } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (payload) => {
    await register(payload);
    navigate('/login');
  };

  return <div className="max-w-md mx-auto bg-white border rounded p-5"><h1 className="text-xl font-semibold mb-4">Register</h1><RegisterForm onSubmit={handleRegister} /></div>;
};

export default Register;
