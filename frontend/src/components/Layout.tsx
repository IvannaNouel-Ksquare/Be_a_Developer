import { Outlet } from "react-router-dom";

// This component gives us the pages general layout and allows us to connect components through the outlet
const Layout = () => {
  return <Outlet />;
};

export default Layout;
