import { AuthProvider } from "./context/AuthCtx";
import Router from "./routes";
import "./App.css";

//redux store
import store from "./redux/store";
import { Provider } from "react-redux/es/exports";
function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
