import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import Update from "./pages/Update";
import Success from "./pages/Success";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update" element={<Update />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};
