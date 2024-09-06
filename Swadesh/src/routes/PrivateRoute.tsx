import { Navigate, Outlet } from 'react-router-dom';
import { useLoginStore } from '../Store/useLoginStore';

interface PrivateRouteProps {
  allowedRoles: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { userRole } = useLoginStore();

  if (userRole === null) {
    // Handle the case where the userRole is not set
    return <Navigate to="/" />;
  }

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
