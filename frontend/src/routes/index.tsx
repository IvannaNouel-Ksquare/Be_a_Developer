import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RequireAuth from "../context/RequireAuth";
import Categories from "../pages/Categories";
import Admin from "../pages/Admin";
import LoginAdmin from "../pages/LoginAdmin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/dashboard" element={<Admin />} />

        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
