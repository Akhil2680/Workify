import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { register } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (payload) => {
    try {
      await register(payload);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
        <p className="text-slate-500 mb-8 text-center">Join our community today</p>

        <RegisterForm onSubmit={handleRegister} />

        <div className="mt-8 text-center font-medium">
          <p className="text-slate-600">
            Already have an account? {' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

