import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthCtx";
import RequireAuth from "./context/RequireAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />

          <Route
            path="home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
