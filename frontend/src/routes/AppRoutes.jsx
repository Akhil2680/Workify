import { Route, Routes } from 'react-router-dom';
import Home from '../pages/client/Home';
import Workers from '../pages/client/Workers';
import BookWorker from '../pages/client/BookWorker';
import MyBookings from '../pages/client/MyBookings';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/worker/Dashboard';
import BookingRequests from '../pages/worker/BookingRequests';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/workers" element={<Workers />} />
    <Route path="/book/:id" element={<ProtectedRoute><BookWorker /></ProtectedRoute>} />
    <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
    <Route path="/worker/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/worker/booking-requests" element={<ProtectedRoute><BookingRequests /></ProtectedRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
