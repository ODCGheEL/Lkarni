import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import AuthRoutes from "./utils/AuthRoutes";
import AddKridi from "./pages/AddKridi";
import EditKridi from "./pages/EditKridi";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<AuthRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddKridi />} />
            <Route path="/edit/:id" element={<EditKridi />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
