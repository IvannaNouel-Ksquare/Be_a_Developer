import { AuthProvider } from "./context/AuthCtx";
import Router from "./routes";
import './App.css';

function App() {
  return (
      <AuthProvider>
       <div className='App'>
          <Router/>
        </div>
      </AuthProvider>
  );
}

export default App;
