import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session by calling the backend logout API
    fetch("http://localhost/expense_back/logout.php", {
      method: "POST",
      credentials: "include", // Include cookies for session handling
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          
          navigate("/login");
        } else {
          alert(data.message || "Failed to logout. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }, [navigate]);

  return (
    <div className="text-center">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
