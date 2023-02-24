import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RequireAuth from "../context/RequireAuth";
import Categories from "../pages/Categories";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
