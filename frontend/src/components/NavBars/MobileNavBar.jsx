import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../Buttons/CustomButton.jsx";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailIcon from "@mui/icons-material/Email";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import useResponsive from "../Hooks/UseResponsive.jsx";

const navItems = [
  {
    key: "home",
    label: "Acasa",
    path: "/",
    iconActive: <HomeIcon />,
    iconInactive: <HomeOutlinedIcon />,
  },
  {
    key: "about",
    label: "Despre",
    path: "/about",
    iconActive: <InfoIcon />,
    iconInactive: <InfoOutlinedIcon />,
  },
  {
    key: "services",
    label: "Servicii",
    path: "/services",
    iconActive: <AutoAwesomeIcon />,
    iconInactive: <AutoAwesomeOutlinedIcon />,
  },

  {
    key: "contact",
    label: "Contact",
    path: "/contact",
    iconActive: <EmailIcon />,
    iconInactive: <EmailOutlinedIcon />,
  },

  {
    key: "shop",
    label: "Rezevare",
    path: "/shop",
    iconActive: <EventIcon />,
    iconInactive: <EventAvailableOutlinedIcon />,
  },
];

function MobileNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSmallScreen } = useResponsive();

  const [selected, setSelected] = useState(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    return current ? current.key : "home";
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current && current.key !== selected) {
      setSelected(current.key);
    }
  }, [location.pathname, selected]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 5) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box
      sx={{
        display: isSmallScreen ? "flex" : "none",
        gap: ".3em",
        width: "100%",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        padding: "0.5em 1em 2em 1em",
        boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
        zIndex: "999",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {navItems.map(({ key, label, path, iconActive, iconInactive }) => (
        <CustomButton
          key={key}
          display="flex"
          flexDirection="column-reverse"
          value={label}
          icon={selected === key ? iconActive : iconInactive}
          fontSize=".6em"
          color="#000"
          border="none"
          onClick={() => {
            setSelected(key);
            navigate(path);
          }}
        />
      ))}
    </Box>
  );
}

export default MobileNavBar;
