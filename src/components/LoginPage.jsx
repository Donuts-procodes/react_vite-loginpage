import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      window.location.href = "/profile";
      toast.success("User logged in successfully!", { position: "top-center" });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email to reset your password.", {
        position: "top-center",
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
      <h1>LogIn</h1>
      <div
        className="input-group mb-3"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <span
          className="input-group-text bg-dark-subtle mt-3"
          id="basic-addon1"
          style={{ border: "1px solid #000" }}
        >
          @
        </span>
        <input
          type="text"
          className="form-control bg-dark-subtle mt-3"
          placeholder="Username"
          aria-label="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Password"
          aria-label="Password"
          style={{ border: "1px solid #000" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        className="input-group mb-5 mt-5"
        style={{
          width: "50%",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn btn-primary" style={{ width: "100%" }}>
          Login
        </button>
      </div>
      <div>
        <p onClick={handleReset} style={{ cursor: "pointer" }}>
          Forgot Password?
        </p>
      </div>
      <div>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Click here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
