import React from "react";
import { Box, Typography } from "@mui/material";
import CustomBox from "../Containers/CustomBox.jsx";
import themeColor from "../../Theme/themeColors.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import Divider from "../Details/Divider.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/DesktopNavBar.css";
import "../Styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { isSmallScreen, isMediumScreen } = useResponsive();

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const footerItems = [
    {
      title: "Link-uri rapide",
      value: ["Acasa", "Despre", "Servicii", "Contact", "Rezervare"],
      path: ["/", "/about", "/services", "/contact", "/shop"],
    },
    {
      title: "Legal",
      value: [
        "Politica de confidentialitate",
        "Termenii si condiitile",
        "Politica de anulare",
        "Regulamentul cabanei",
      ],
      path: [],
    },
    {
      title: "Contact",
      value: [<LocationOnIcon />, <EmailIcon />, <PhoneIcon />, "Social media"],
      infoValue: ["*****:))", "*****@gmail.com", "**********"],
      mediaIcons: [
        <FacebookIcon
          sx={{
            color: "inherit",
            fontSize: "2em",
            transition: "color 0.3s ease",
          }}
        />,
        <InstagramIcon
          sx={{
            color: "inherit",
            fontSize: "2em",
            transition: "color 0.3s ease",
          }}
        />,
      ],
      path: [
        // "https://www.facebook.com/profile.php?id=61568902723098&locale=ro_RO",
        // "https://www.instagram.com/a.laursu/",
        "https://www.google.com/",
        "https://www.google.com/",
      ],
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: themeColor.palette.secondary.contrastText,
        width: "100%",
        height: "auto",
        color: themeColor.palette.primary.contrastText,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
        marginBottom: isSmallScreen ? "5.8em" : 0,
      }}
    >
      <CustomBox
        maxWidth={"100em"}
        padding={isSmallScreen ? "3em 1em" : "3em"}
        gap={"2em"}
      >
        <CustomBox
          gap={"3em"}
          display={"grid"}
          gridTemplateColumns={
            isSmallScreen
              ? "repeat(1, 1fr)"
              : isMediumScreen
                ? "repeat(2,1fr)"
                : "repeat(3, 1fr)"
          }
          alignItems={"start"}
          zIndex={"1"}
        >
          {footerItems.map((item, index) => (
            <CustomBox
              className={"border-run"}
              key={index}
              gap={"1em"}
              alignItems={"start"}
              padding={"1em"}
              height={"100%"}
              justifyContent={"start"}
            >
              <Typography fontSize={"1.5em"} fontWeight={"bold"}>
                {item.title}
              </Typography>
              <Divider
                color={themeColor.palette.primary.contrastText}
                maxWidth={"50%"}
                height={".1em"}
              />

              {item.value.map((vItem, vIndex) => {
                if (vItem === "Social media") {
                  return (
                    <Box key={vIndex}>
                      <CustomBox
                        flexDirection={"row"}
                        justifyContent={"start"}
                        gap={".5em"}
                      >
                        {item.mediaIcons.map((miIcon, miIndex) => (
                          <Box
                            key={miIndex}
                            component="a"
                            href={item.path[miIndex]}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              backgroundColor: "transparent",
                              padding: ".2em",
                              borderRadius: "2em",
                              display: "flex",
                              alignItems: "center",
                              color: themeColor.palette.primary.contrastText,

                              "&:hover": {
                                backgroundColor:
                                  themeColor.palette.primary.contrastText,
                                color:
                                  themeColor.palette.secondary.contrastText,
                              },
                            }}
                          >
                            {miIcon}
                          </Box>
                        ))}
                      </CustomBox>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      className={
                        currentPath === item.path[vIndex] ||
                        item.title === "Contact"
                          ? ""
                          : "underline-from-center"
                      }
                      onClick={() => {
                        if (item.title !== "Contact")
                          navigate(`/${item.path[vIndex].replace(/^\/?/, "")}`);
                      }}
                      sx={{
                        cursor: item.title !== "Contact" ? "pointer" : "auto",
                        textDecoration: "none",
                        color: themeColor.palette.primary.contrastText,
                        textShadow:
                          currentPath === item.path[vIndex]
                            ? `0 0 5px ${themeColor.palette.primary.contrastText},
                             0 0 10px ${themeColor.palette.primary.contrastText},
                             0 0 20px ${themeColor.palette.primary.contrastText}`
                            : "none",
                      }}
                      key={vIndex}
                      display={"flex"}
                      alignItems={"center"}
                      gap={".5em"}
                    >
                      {vItem}
                      {item.infoValue && item.infoValue[vIndex]}
                    </Box>
                  );
                }
              })}
            </CustomBox>
          ))}
        </CustomBox>
        <Divider
          maxWidth={"100%"}
          color={themeColor.palette.primary.contrastText}
          height={"1px"}
          opacity={"0.7"}
        />
        <CustomBox>
          <Typography alignItems={"center"} display={"flex"}>
            © {currentYear} ***** - Toate drepturile rezervare.
          </Typography>
        </CustomBox>
      </CustomBox>
    </Box>
  );
}

export default Footer;
