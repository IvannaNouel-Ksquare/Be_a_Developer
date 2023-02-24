import { CircularProgress } from "@mui/material";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthCtx";
import './style.css';


type Props = {
  children?: JSX.Element;
};

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  }

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
