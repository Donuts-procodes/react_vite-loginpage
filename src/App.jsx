import "./App.css";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
// import ResetPassword from "./components/resetpassword";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Update loading state after auth check
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    // Show a loading spinner or message until the auth state is determined
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route
                  index
                  element={
                    user ? <Navigate to="/profile" replace /> : <LoginPage />
                  }
                />
                <Route
                  path="/login"
                  element={
                    user ? <Navigate to="/profile" replace /> : <LoginPage />
                  }
                />
                <Route
                  path="/register"
                  element={
                    user ? <Navigate to="/profile" replace /> : <Register />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    user ? <Profile /> : <Navigate to="/login" replace />
                  }
                />
                {/* <Route
                  path="/resetpassword"
                  element={
                    user ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <ResetPassword />
                    )
                  }
                /> */}
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
