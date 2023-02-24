import { CircularProgress } from "@mui/material";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthCtx";
import { useDataContext } from "./context";
import './style.css';

const RequireAuth = () => {
  const context = useDataContext();
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  }

  return user && context.userToken ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
};

export default RequireAuth;