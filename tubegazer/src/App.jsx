import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import VideoDetail from "./pages/VideoDetail";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Loading TubeGazer...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Navbar />
        <Routes>
          <Route path="/"           element={<Dashboard />} />
          <Route path="/video/:id"  element={<VideoDetail />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;