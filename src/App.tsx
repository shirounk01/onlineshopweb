import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./styles.css";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
