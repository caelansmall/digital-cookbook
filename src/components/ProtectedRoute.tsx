import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider";
import Navbar from '../Navbar';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoute;
