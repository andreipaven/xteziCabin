import React, { useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Typography } from "@mui/material";
import themeColors from "../../Theme/themeColors.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function AdminSideBar() {
  const { isSmallScreen } = useResponsive();
  const basePath = "/admin-panel-macarie@23";
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sideBarItems = [
    {
      name: "Home",
      path: `${basePath}/`,
      icon: (
        <HomeOutlinedIcon
          sx={{ color: themeColors.palette.primary.contrastText }}
        />
      ),
      activeIcon: (
        <HomeIcon sx={{ color: themeColors.palette.secondary.contrastText }} />
      ),
      mobileIcon: (
        <HomeOutlinedIcon
          sx={{ color: themeColors.palette.primary.contrastText }}
        />
      ),
      mobileActiveIcon: (
        <HomeIcon sx={{ color: themeColors.palette.primary.contrastText }} />
      ),
    },
    {
      name: "Back",
      path: "/",
      icon: (
        <ArrowBackOutlinedIcon
          sx={{ color: themeColors.palette.primary.contrastText }}
        />
      ),
      activeIcon: (
        <ArrowBackOutlinedIcon
          sx={{ color: themeColors.palette.secondary.contrastText }}
        />
      ),
      mobileIcon: (
        <ArrowBackOutlinedIcon
          sx={{ color: themeColors.palette.primary.contrastText }}
        />
      ),
      mobileActiveIcon: (
        <ArrowBackOutlinedIcon
          sx={{ color: themeColors.palette.primary.contrastText }}
        />
      ),
    },
    {
      name: "Log out",
      path: "/",
      icon: (
        <LogoutIcon sx={{ color: themeColors.palette.primary.contrastText }} />
      ),
      activeIcon: (
        <LogoutIcon
          sx={{ color: themeColors.palette.secondary.contrastText }}
        />
      ),
      mobileIcon: (
        <LogoutIcon sx={{ color: themeColors.palette.primary.contrastText }} />
      ),
      mobileActiveIcon: (
        <LogoutIcon sx={{ color: themeColors.palette.primary.contrastText }} />
      ),
    },
  ];

  return (
    <CustomBox
      position={"fixed"}
      top={0}
      left={0}
      width={isSmallScreen ? "4em" : "10em"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={"1em"}
      padding={"1em 0em"}
      backgroundColor={themeColors.palette.secondary.contrastText}
    >
      {sideBarItems.map((item, index) => {
        const isActive =
          location.pathname === item.path ||
          location.pathname === item.path.replace(/\/$/, "");

        const isHovered = hoveredIndex === index;

        const iconToShow = isSmallScreen
          ? isActive || isHovered
            ? item.mobileActiveIcon
            : item.mobileIcon
          : isActive || isHovered
            ? item.activeIcon
            : item.icon;

        return (
          <Box
            key={index}
            sx={{
              width: "100%",
              cursor: "pointer",
              padding: ".5em 1em",
              color: isActive
                ? themeColors.palette.secondary.contrastText
                : themeColors.palette.primary.contrastText,
              backgroundColor: isSmallScreen
                ? themeColors.palette.secondary.contrastText
                : isActive
                  ? themeColors.palette.primary.contrastText
                  : "",
              "&:hover": {
                backgroundColor: isSmallScreen
                  ? ""
                  : themeColors.palette.primary.contrastText,
                color: themeColors.palette.secondary.contrastText,
              },
              transition: "all 0.3s ease",
            }}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={".5em"}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Typography
              display={"flex"}
              width={isSmallScreen ? "100%" : "auto"}
              justifyContent={"center"}
            >
              {iconToShow}
            </Typography>
            <Typography display={isSmallScreen ? "none" : "flex"}>
              {item.name}
            </Typography>
          </Box>
        );
      })}
    </CustomBox>
  );
}

export default AdminSideBar;
