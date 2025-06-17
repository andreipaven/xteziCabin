import React, { useEffect, useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import CustomButton from "../Buttons/CustomButton.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import themeColors from "../../Theme/themeColors.jsx";
import "../Styles/DesktopNavBar.css";

const navItemsDesktop = [
  {
    key: "home",
    label: "Acasa",
    path: "/",
  },
  {
    key: "about",
    label: "Despre",
    path: "/about",
  },
  {
    key: "services",
    label: "Servicii",
    path: "/services",
  },
  {
    key: "contact",
    label: "Contact",
    path: "/contact",
  },
];
function DesktopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(() => {
    const current = navItemsDesktop.find(
      (item) => item.path === location.pathname,
    );
    if (current) return current.key;
    if (location.pathname === "/shop") return "shop";
    return "home";
  });

  useEffect(() => {
    const current = navItemsDesktop.find(
      (item) => item.path === location.pathname,
    );
    if (current && current.key !== selected) {
      setSelected(current.key);
    }
  }, [location.pathname, selected]);

  return (
    <CustomBox
      flexDirection={"row"}
      height={"4em"}
      backgroundColor={themeColors.palette.secondary.contrastText}
      gap={"1em"}
      position={"fixed"}
      top={0}
      left={0}
    >
      {navItemsDesktop.map(({ key, label, path }) => (
        <CustomButton
          className={`underline-from-center ${selected === key ? "selected" : ""}`}
          key={key}
          display={"flex"}
          value={label}
          fontSize={".8em"}
          color={themeColors.palette.primary.contrastText}
          border={"none"}
          fontWeight={"bold"}
          onClick={() => {
            setSelected(key);
            navigate(path);
          }}
          padding={".5em 1em"}
          borderRadius={"0em"}
        />
      ))}
      <CustomButton
        className={`background-from-center ${selected === "shop" ? "selected" : ""}`}
        value={"Rezervare"}
        color={themeColors.palette.primary.contrastText}
        colorHover={themeColors.palette.secondary.contrastText}
        borderRadius={"20em"}
        fontWeight={"bold"}
        border={"none"}
        onClick={() => {
          setSelected("shop");
          navigate("/shop");
        }}
      />
    </CustomBox>
  );
}

export default DesktopNavBar;
