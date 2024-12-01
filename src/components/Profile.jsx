import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore"; // Correct capitalization
import { toast } from "react-toastify";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef); // Corrected 'Await' to 'await'

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("User not logged in");
          toast.error("User not logged in.");
        }
      });
    } catch (error) {
      console.error("Error fetching user data: ", error);
      toast.error("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function handleLogout() {
    try {
      auth.signOut().then(() => {
        window.location.href = "/login";
        console.log("User logged out successfully!");
      });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div
      className="container mt-5"
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
      {loading ? (
        <p>LOADING....</p>
      ) : userDetails ? (
        <>
          <h3>Welcome {userDetails.firstname}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstname}</p>
            <p>Last Name: {userDetails.lastname}</p>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "40%" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
}

export default Profile;
