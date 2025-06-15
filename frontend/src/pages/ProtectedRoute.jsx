
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/UserProvider';

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  if (!userInfo) {

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;