import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RequireAuth from "../context/RequireAuth";
import Categories from "../pages/Categories";
import QuizzCSS from "../pages/QuizzCSS/QuizzCSS";
import Score from "../pages/Score/Score";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz-css" element={<QuizzCSS />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
