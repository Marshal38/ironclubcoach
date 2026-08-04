import { Navigate } from 'react-router-dom';
import { useUser } from './useUser';
import Spinner from '../ui/Spinner';

function ProtectRoute({ children }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/staff-entry-x8z2" replace />;

  return children;
}

export default ProtectRoute;
