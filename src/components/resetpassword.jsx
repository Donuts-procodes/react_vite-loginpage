import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

  // Extract the oobCode from the URL
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!oobCode) {
      toast.error("Invalid or missing password reset code.", {
        position: "top-center",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password reset successfully! Please log in.", {
        position: "top-center",
      });
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <form
      onSubmit={handlePasswordReset}
      className="container rounded text-center mt-3"
      style={{
        height: "90vh",
        boxShadow: "4px 4px 1px #000",
        border: "3px solid #000",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Reset Password</h1>
      <div
        className="input-group mb-3"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <input
          type="password"
          className="form-control bg-dark-subtle mt-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: "1px solid #000" }}
        />
      </div>
      <div
        className="input-group mb-3"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <input
          type="password"
          className="form-control bg-dark-subtle mt-3"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ border: "1px solid #000" }}
        />
      </div>
      <button className="btn btn-primary" style={{ width: "50%" }}>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
