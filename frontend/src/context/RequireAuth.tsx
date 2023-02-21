import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthCtx";

type Props = {
  children?: JSX.Element;
};

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
