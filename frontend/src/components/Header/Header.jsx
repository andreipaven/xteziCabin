import React from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import DesktopNavBar from "../NavBars/DesktopNavBar.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";

function Header() {
  const { isSmallScreen } = useResponsive();
  return (
    <CustomBox
      zIndex={"9999"}
      mt={isSmallScreen ? "0em" : "4em"}
      display={isSmallScreen ? "none" : "flex"}
    >
      <CustomBox maxWidth={"100em"}>
        <DesktopNavBar />
      </CustomBox>
    </CustomBox>
  );
}

export default Header;
