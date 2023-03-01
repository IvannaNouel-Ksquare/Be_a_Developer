import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import RequireAuth from "../context/RequireAuth";
import Categories from "../pages/Categories";
import Admin from "../pages/Admin";
import LoginAdmin from "../pages/LoginAdmin";
import QuestionListView from "../pages/QuestionList";
import EditQuestionView from "../pages/EditQuestion";

//!cambiar luego
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<LoginAdmin />} />

{/*         <Route element={<RequireAuth />}>
 */}          <Route path="/dashboard" element={<Admin />} />
          <Route path="/questionList" element={<QuestionListView />} />
          <Route path="/editQuestion" element={<EditQuestionView />} />

          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
{/*         </Route>
 */}      </Routes>
    </BrowserRouter>
  );
};

export default Router;
