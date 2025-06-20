import React, { useEffect } from "react";
import { fetchCheckAdmin } from "../../Services/adminServices.js";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = async () => {
      const result = await fetchCheckAdmin();
      if (!result) {
        navigate("/");
      }
    };

    isLoggedIn().catch((err) => {
      console.log("Error " + err);
    });
  }, []);

  return <div>hellow lume</div>;
}

export default AdminPanel;
