import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstname: firstname,
          lastname: lastname,
        });
      }
      console.log("User Registered Successfully");
      toast.success("User Registered Succesfully", { position: "top-center" });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };
  return (
    <form
      onSubmit={handleRegister}
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
      <h1>Register</h1>
      <div
        className="input-group mb-3"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <input
          type="text"
          className="form-control bg-dark-subtle mt-3"
          placeholder="FirstName"
          aria-label="FirstName"
          style={{ border: "1px solid #000" }}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div
        className="input-group mb-3"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <input
          type="text"
          className="form-control bg-dark-subtle mt-3"
          placeholder="LastName"
          aria-label="LastName"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={{ border: "1px solid #000" }}
          required
        />
      </div>
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
          type="email"
          className="form-control bg-dark-subtle mt-3"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: "1px solid #000" }}
          required
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
          required
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
          Register
        </button>
      </div>
      <div>
        Already have an Account <Link to="/">Click here</Link>
      </div>
    </form>
  );
};

export default LoginPage;
