import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../recoil/useAuth';

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  //   const isAuthenticated = true;
  //   const currentUser = {role : 'admin'};
  //   const loading = false;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login?message=You must be logged in with admin rights to access this page."
        state={{ from: window.location.pathname }}
        replace
      />
    );
  }

  if (
    adminOnly &&
    currentUser?.role !== 'admin' &&
    currentUser?.role !== 'recruiter' &&
    currentUser?.role !== 'contributor'
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
