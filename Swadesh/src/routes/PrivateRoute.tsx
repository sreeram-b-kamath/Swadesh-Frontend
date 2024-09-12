import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  // Retrieve and parse userRole from localStorage
  const storedRole = localStorage.getItem('role');
  const userRole = storedRole ? Number(storedRole) : null;

  if (userRole === null) {
    // Handle the case where userRole is not set
    return <Navigate to="/" />;
  }

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

