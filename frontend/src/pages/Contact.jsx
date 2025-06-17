import React, { useState } from "react";
import themeColor from "../Theme/themeColors.jsx";
import CustomBox from "../components/Containers/CustomBox.jsx";
import bgContactFirstBox from "../assets/bgContactFirstBox.jpg";
import { Box, Typography } from "@mui/material";
import useResponsive from "../components/Hooks/UseResponsive.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MobileNavBar from "../components/NavBars/MobileNavBar.jsx";
import CustomButton from "../components/Buttons/CustomButton.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Header from "../components/Header/Header.jsx";
import { animationPresets } from "../components/Animations/animationPresets .js";
import CustomTypography from "../components/Containers/CustomTypography.jsx";

function Contact() {
  const { isSmallScreen } = useResponsive();
  const [firstNameInput, setNameInput] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const infoItems = [
    {
      label: "Adresa",
      value: "************:))",
      icon: <LocationOnIcon />,
    },
    { label: "Email", value: "*****@gmail.com", icon: <EmailIcon /> },
    { label: "Telefon", value: "**********", icon: <PhoneIcon /> },
    {
      label: "Social media",
      icon: <ConnectWithoutContactIcon />,
      value: [
        <FacebookIcon
          sx={{
            color: "inherit",
            fontSize: "2em",
            transition: "all 0.3s ease",
          }}
        />,
        <InstagramIcon
          sx={{
            color: "inherit",
            fontSize: "2em",
            transition: "all 0.3s ease",
          }}
        />,
      ],
      path: [
        "https://www.facebook.com/profile.php?id=61568902723098&locale=ro_RO",
        "https://www.instagram.com/a.laursu/",
      ],
    },
  ];

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setNameInput(e.target.value);
  };

  return (
    <CustomBox
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      backgroundColor={themeColor.palette.primary.dark}
    >
      <Header />
      <CustomBox
        width={"100%"}
        height={"100%"}
        minHeight={"20em"}
        color={themeColor.palette.primary.contrastText}
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgContactFirstBox})`}
        animateOnLoad
        animationPreset={animationPresets.fadeIn}
      >
        <Typography fontSize={"3em"} fontWeight={"bold"}>
          Contacteaza-ne
        </Typography>
      </CustomBox>
      <CustomBox width={"100%"}>
        <CustomBox
          maxWidth={"100em"}
          flexDirection={isSmallScreen ? "column" : "row"}
          height={"100%"}
          alignItems={"start"}
          padding={isSmallScreen ? "10em 1em" : "10em 3em"}
          gap={"2em"}
        >
          <CustomBox
            width={isSmallScreen ? "100%" : "50%"}
            alignItems={"start"}
            gap={"2em"}
          >
            <CustomTypography
              fontSize={"2em"}
              fontWeight={"bold"}
              animateOnLoad
              animationPreset={animationPresets.zoom}
            >
              Ai o întrebare sau vrei o ofertă?
            </CustomTypography>
            <CustomBox
              width={"100%"}
              height={"100%"}
              gap={"1em"}
              alignItems={"start"}
              animateOnScroll
              animationPreset={animationPresets.fadeUp}
            >
              <CustomInputField
                size={"small"}
                backgroundColor={themeColor.palette.primary.contrastText}
                label={"Nume"}
                value={firstNameInput}
                fullWidth={true}
                onChange={onChangeName}
              />
              <CustomInputField
                size={"small"}
                backgroundColor={themeColor.palette.primary.contrastText}
                label={"E-mail"}
                fullWidth={true}
                value={inputEmail}
                onChange={onChangeEmail}
              />
              <CustomInputField
                label="Mesaj"
                multiline
                rows={5}
                backgroundColor={themeColor.palette.primary.contrastText}
                fullWidth={true}
              />
              <CustomButton
                value={"Trimite"}
                borderRadius={"2em"}
                padding={"1em"}
                width={"40%"}
                backgroundColor={themeColor.palette.success.light}
                backgroundColorHover={themeColor.palette.success.dark}
                color={themeColor.palette.primary.contrastText}
                fontWeight={"bold"}
                border={"none"}
              />
            </CustomBox>
          </CustomBox>
          <CustomBox
            width={isSmallScreen ? "100%" : "50%"}
            gap={"1em"}
            alignItems={"start"}
            backgroundColor={themeColor.palette.primary.contrastText}
            padding={"2em"}
            borderRadius={"2em"}
            boxShadow={
              "-5px 5px 20px #c4c4c4,\n" + "             5px -5px 20px #ffffff;"
            }
            animateOnScroll
            animationPreset={animationPresets.fadeUp}
          >
            <Typography fontSize={"2em"} fontWeight={"bold"}>
              Informatii
            </Typography>
            {infoItems.map((item, index) => (
              <CustomBox key={index} alignItems={"start"}>
                <Typography
                  fontWeight="bold"
                  fontSize={"1.2em"}
                  gap={".5em"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  {item.icon}
                  {item.label}
                </Typography>

                {Array.isArray(item.value) ? (
                  <CustomBox
                    flexDirection={"row"}
                    justifyContent={"start"}
                    gap={".5em"}
                  >
                    {item.value.map((val, i) => (
                      <Box
                        key={i}
                        component="a"
                        href={item.path[i]}
                        target={"_blank"}
                        sx={{
                          backgroundColor: "transparent",
                          padding: ".2em",
                          borderRadius: "2em",
                          display: "flex",
                          alignItems: "center",
                          color: themeColor.palette.secondary.contrastText,

                          "&:hover": {
                            backgroundColor:
                              themeColor.palette.secondary.contrastText,
                            color: themeColor.palette.primary.contrastText,
                          },
                        }}
                      >
                        {val}
                      </Box>
                    ))}
                  </CustomBox>
                ) : (
                  <Typography>{item.value}</Typography>
                )}
              </CustomBox>
            ))}
          </CustomBox>
        </CustomBox>
      </CustomBox>
      <Footer />
      <MobileNavBar />
    </CustomBox>
  );
}

export default Contact;
