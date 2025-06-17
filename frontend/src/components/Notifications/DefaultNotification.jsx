import React from "react";
import { ToastContainer } from "react-toastify";
import useResponsive from "../Hooks/UseResponsive.jsx";

function DefaultNotification({ ...rest }) {
  const { isSmallScreen } = useResponsive();
  return (
    <ToastContainer
      {...rest}
      style={{
        width: isSmallScreen ? "70%" : "100%",
        marginLeft: isSmallScreen ? "auto" : "0",
        marginTop: isSmallScreen ? "1em" : "auto",
        // right: isSmallScreen ? "0" : "unset",
      }}
    />
  );
}

export default DefaultNotification;
