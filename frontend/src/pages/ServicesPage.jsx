import React from "react";
import themeColor from "../Theme/themeColors.jsx";
import CustomBox from "../components/Containers/CustomBox.jsx";
import bgServicesFirstBox from "../assets/bgServicesFirstBox.jpg";
import { Typography } from "@mui/material";

import useResponsive from "../components/Hooks/UseResponsive.jsx";
import Divider from "../components/Details/Divider.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MobileNavBar from "../components/NavBars/MobileNavBar.jsx";
import Header from "../components/Header/Header.jsx";
import ShowerIcon from "@mui/icons-material/Shower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LandscapeIcon from "@mui/icons-material/Landscape";
import CheckIcon from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomTypography from "../components/Containers/CustomTypography.jsx";
import { animationPresets } from "../components/Animations/animationPresets .js";

function ServicesPage() {
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useResponsive();

  const serviceItems = [
    {
      title: "Baie",
      message:
        "Spațiu cald și elegant, cu duș walk-in, lemn natural și finisaje moderne. Prosoape pufoase, produse eco și încălzire în pardoseală – confort deplin după o zi în natură.",
      icon: (
        <ShowerIcon
          fontSize={"inherit"}
          sx={{ width: "100%", height: "100%" }}
        />
      ),
      values: [
        "Hartie igienica",
        "Prosoape",
        "Dus/Cada",
        "Toaleta",
        "Alte articole",
      ],
    },

    {
      title: "Tehnologie",
      message:
        "Cabana este echipată cu conexiune Wi-Fi rapidă, prize multiple și iluminat inteligent pentru confort maxim. De asemenea, dispune de televizoare cu ecran plat și sistem audio pentru momente de relaxare și divertisment.",
      icon: (
        <LiveTvIcon
          fontSize={"inherit"}
          sx={{ width: "100%", height: "100%" }}
        />
      ),
      values: [
        "TV cu ecran plat",
        "Serviciu de streaming (ex. Netflix)",
        "Internet WIFI",
        "Alte articole",
      ],
    },
    {
      title: "Exterior",
      message:
        "Bucură-te de aer curat și priveliști superbe în spațiul exterior al cabanei — terasă spațioasă, grătar, mobilier confortabil și zone verzi ideale pentru relaxare sau activități în familie.",
      icon: (
        <LandscapeIcon
          fontSize={"inherit"}
          sx={{ width: "100%", height: "100%" }}
        />
      ),
      values: [
        "2 Ciubere",
        "Zona de picnic",
        "Terasă",
        "Grătar",
        "Grădină",
        "Vedere la oras",
        "Alte articole",
      ],
    },
    {
      title: "Bucatarie",
      message:
        "Bucătărie primitoare și practică, cu toate ustensilele, frigider, plită și aparat de cafea – ideală pentru preparate gustoase în liniștea cabanei.",
      icon: (
        <RestaurantIcon
          fontSize={"inherit"}
          sx={{ width: "100%", height: "100%" }}
        />
      ),
      values: [
        "Masă",
        "Mașină de cafea",
        "Produse de curățenie",
        "Prăjitor de pâine",
        "Cuptor",
        "Cuptor cu microunde",
        "Frigider",
        "Chiuveta",
        "Ustensile de bucătărie",
        "Alte articole",
      ],
    },
    {
      title: "General",
      message:
        "Cabana noastră îmbină confortul modern cu farmecul rustic, oferindu-ți un refugiu perfect pentru relaxare și aventură. Fiecare detaliu este gândit să te facă să te simți ca acasă, înconjurat de peisaje de vis și facilități atent alese pentru confortul tău.",
      icon: (
        <SettingsIcon
          fontSize={"inherit"}
          sx={{ width: "100%", height: "100%" }}
        />
      ),
      values: [
        "Parcare",
        "Masa",
        "Scaune",
        "Covoare",
        "Termopane",
        "Incalzire in pardoseala",
        "Centrala",
        "Lumini exterioare",
        "Alte articole",
      ],
    },
  ];

  return (
    <CustomBox
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      backgroundColor={themeColor.palette.primary.contrastText}
    >
      <Header />
      <CustomBox
        width={"100%"}
        height={"100%"}
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgServicesFirstBox})`}
        color={themeColor.palette.primary.contrastText}
        minHeight="20em"
        animateOnLoad
        animationPreset={animationPresets.fadeIn}
      >
        <CustomBox
          maxWidth={"100em"}
          padding={isSmallScreen ? "1em" : "1em 3em"}
        >
          <Typography fontSize={"3em"} fontWeight={"bold"} textAlign={"center"}>
            Serviciile noastre
          </Typography>
        </CustomBox>
      </CustomBox>
      <CustomBox width={"100%"}>
        <CustomBox
          maxWidth={"100em"}
          gap={"1em"}
          padding={"1em"}
          overflow={"hidden"}
        >
          <CustomTypography
            fontSize={"1.5em"}
            fontWeight={"bold"}
            textAlign={"center"}
            animateOnLoad
            animationPreset={animationPresets.zoom}
          >
            Este timpul sa iti incepi aventura
          </CustomTypography>
          <Divider />
          <CustomTypography
            textAlign={"center"}
            width={isSmallScreen ? "100%" : "60%"}
            animateOnLoad
            animationPreset={animationPresets.fadeUp}
          >
            Oferim servicii profesionale și personalizate, adaptate nevoilor
            fiecărui client, punând accent pe calitate, eficiență și satisfacție
            garantată. Indiferent de proiect, suntem dedicați să livrăm soluții
            complete și de încredere, care aduc rezultate vizibile și durabile.
          </CustomTypography>
        </CustomBox>
      </CustomBox>
      <CustomBox gap={"1em"} height={"auto"}>
        <CustomBox
          maxWidth={"100em"}
          padding={isSmallScreen ? "1em" : "1em 3em"}
          display={"grid"}
          gap={"2em"}
          alignItems={"start"}
          gridTemplateColumns={
            isMediumScreen
              ? "repeat(1, 1fr)"
              : isLargeScreen
                ? "repeat(2, 1fr)"
                : "repeat(3,1fr)"
          }
        >
          {serviceItems.map((item, index) => (
            <CustomBox
              key={index}
              boxShadow={"0 10px 20px rgba(0, 0, 0, 0.2)"}
              padding={"1em"}
              gap={".5em"}
              height={"100%"}
              justifyContent={"start"}
              animateOnScroll
              animationPreset={animationPresets.fadeUp}
            >
              <Typography width={"100%"} height={"3em"}>
                {item.icon}
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"1.5em"}
                fontWeight={"bold"}
              >
                {item.title}
              </Typography>
              <Typography textAlign={"center"} padding={"0 2em"}>
                {item.message}
              </Typography>
              {item.values.map((itemV, indexV) => (
                <CustomBox
                  key={indexV}
                  flexDirection={"row"}
                  justifyContent={"start"}
                  gap={".5em"}
                >
                  <CheckIcon />
                  <Typography display={"flex"} flexDirection={"row"}>
                    {itemV}
                  </Typography>
                </CustomBox>
              ))}
            </CustomBox>
          ))}
        </CustomBox>
      </CustomBox>
      <Footer />
      <MobileNavBar />
    </CustomBox>
  );
}

export default ServicesPage;
