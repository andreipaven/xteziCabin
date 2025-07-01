import React, { useEffect } from "react";
import { fetchCheckAdmin } from "../../Services/adminServices.js";
import { useNavigate, useLocation } from "react-router-dom";
import CustomBox from "../Containers/CustomBox.jsx";
import AdminSideBar from "../NavBars/AdminSideBar.jsx";
import HomePage from "../../pages/HomePage.jsx";
import ServicesPage from "../../pages/ServicesPage.jsx";
import AboutPage from "../../pages/AboutPage.jsx";
import { Outlet } from "react-router-dom";
import useResponsive from "../Hooks/UseResponsive.jsx";

function AdminPanel() {
  const { isSmallScreen } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const isLoggedIn = async () => {
  //     const result = await fetchCheckAdmin();
  //     if (!result) {
  //       navigate("/");
  //     }
  //   };
  //
  //   isLoggedIn().catch((err) => {
  //     console.log("Error " + err);
  //   });
  // }, []);

  return (
    <CustomBox style={{ display: "flex" }}>
      <AdminSideBar />
      <CustomBox ml={isSmallScreen ? "4em" : "10em"} width={"auto"}>
        <Outlet />
      </CustomBox>
    </CustomBox>
  );
}

export default AdminPanel;
