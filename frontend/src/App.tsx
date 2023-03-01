import { AuthProvider } from "./context/AuthCtx";
import Router from "./routes";
import './App.css';
import LivecycleSdk from '@livecycle/sdk'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

LivecycleSdk.init()

function App() {
  return (
      <AuthProvider>
       <div className='App'>
          <Router/>
          <ToastContainer />

        </div>
      </AuthProvider>
  );
}

export default App;
