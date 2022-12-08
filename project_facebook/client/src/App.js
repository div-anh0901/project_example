import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Regsiter";
import Messenger from "./pages/messager/Messenger";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
      </Routes>
    </Router>
  );
}

export default App;
