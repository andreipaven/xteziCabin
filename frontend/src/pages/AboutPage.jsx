import React from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import {
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import bgAboutFirstBox from "../assets/bgAboutFirstBox.jpg";
import useResponsive from "../components/Hooks/UseResponsive.jsx";
import Divider from "../components/Details/Divider.jsx";
import LoadImage from "../components/Hooks/LoadImage.jsx";
import adventure4 from "../assets/adventure1.jpg";
import adventure2 from "../assets/offer1.jpg";
import Footer from "../components/Footer/Footer.jsx";
import MobileNavBar from "../components/NavBars/MobileNavBar.jsx";
import themeColor from "../Theme/themeColors.jsx";
import Header from "../components/Header/Header.jsx";
import { motion } from "framer-motion";
import { animationPresets } from "../components/Animations/animationPresets .js";

function AboutPage() {
  const { isSmallScreen } = useResponsive();

  const MotionImageListItem = motion(ImageListItem);

  const galleryItems = [
    {
      src: adventure2,
    },
    {
      src: adventure4,
    },
    {
      src: adventure2,
    },
    {
      src: adventure4,
    },
    {
      src: adventure2,
    },
    {
      src: adventure2,
    },
    {
      src: adventure2,
    },
    {
      src: adventure4,
    },
    {
      src: adventure4,
    },
    {
      src: adventure2,
    },
    {
      src: adventure2,
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
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgAboutFirstBox})`}
        color={themeColor.palette.primary.contrastText}
        minHeight="20em"
        animateOnLoad
        animationPreset={animationPresets.fadeIn}
      >
        <CustomBox maxWidth={"100em"}>
          <Typography fontSize={"3em"} fontWeight={"bold"} textAlign={"center"}>
            Cine suntem noi?
          </Typography>
        </CustomBox>
      </CustomBox>
      <CustomBox width={"100%"}>
        <CustomBox
          maxWidth={"100em"}
          padding={isSmallScreen ? "1em" : "4em 3em"}
          flexDirection={isSmallScreen ? "column" : "row"}
          alignItems={"start"}
          overflow={"hidden"}
        >
          <CustomBox
            alignItems={"start"}
            width={isSmallScreen ? "100%" : "50%"}
            gap={"1em"}
            animateOnLoad
            animationPreset={
              isSmallScreen
                ? animationPresets.fadeUp
                : animationPresets.fadeLeft
            }
          >
            <Typography fontSize={"2em"} fontWeight={"bold"}>
              Misiunea noastra
            </Typography>
            <Divider />
            <Typography>
              Am creat un loc unde liniștea naturii se îmbină cu confortul și
              grija pentru detalii. Ne dorim ca fiecare oaspete să se simtă
              relaxat, conectat și departe de agitația zilnică.
            </Typography>

            <Typography>
              Credem în ospitalitate autentică, servicii de calitate și respect
              pentru natură. Fiecare experiență aici e gândită să ofere
              echilibru, simplitate și bucurie reală.
            </Typography>
          </CustomBox>
          <CustomBox
            alignItems={"end"}
            width={isSmallScreen ? "100%" : "50%"}
            animateOnScroll
            animationPreset={
              isSmallScreen
                ? animationPresets.fadeUp
                : animationPresets.fadeRight
            }
          >
            <LoadImage
              maxHeight={isSmallScreen ? "auto" : "20em"}
              src={adventure4}
              alt={"Missing image"}
            />
          </CustomBox>
        </CustomBox>
      </CustomBox>
      <CustomBox
        maxWidth={"100em"}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={"start"}
        padding={isSmallScreen ? "1em" : "3em"}
        gap={"1em"}
      >
        <CustomBox
          alignItems={"start"}
          gap={"1em"}
          width={isSmallScreen ? "100%" : "50%"}
          animateOnScroll
          animationPreset={animationPresets.fadeUp}
        >
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Cele mai tari experiente
          </Typography>
          <Divider />
          <Typography>
            La cabană, aventura și relaxarea se îmbină perfect — de la drumeții
            și plimbări cu ATV-ul, la seri la foc de tabără sub cerul înstelat.
          </Typography>
          <Typography>
            Oferim și yoga în aer liber, ciubăr încălzit, saună și ture ghidate,
            pentru o experiență completă și memorabilă în mijlocul naturii.
          </Typography>
        </CustomBox>
        <CustomBox
          alignItems={"start"}
          gap={"1em"}
          width={isSmallScreen ? "100%" : "50%"}
          animateOnScroll
          animationPreset={animationPresets.fadeUp}
        >
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Valorile Noastre
          </Typography>
          <Divider />
          <Typography>
            La *****, ne dedicăm să oferim experiențe memorabile în mijlocul
            naturii. Credem că fiecare ședere ar trebui să fie mai mult decât o
            simplă cazare – o evadare relaxantă și o reconectare cu frumusețea
            peisajului românesc.
          </Typography>
          <List sx={{ listStyle: "disc", width: "100%" }}>
            <ListItem sx={{ display: "flex", p: ".5em 0em", gap: ".5em" }}>
              <Divider maxWidth={"2em"} />
              <Typography>Confort și Relaxare</Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", p: ".5em 0em", gap: ".5em" }}>
              <Divider maxWidth={"2em"} />
              <Typography>Respect pentru Natură</Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", p: ".5em 0em", gap: ".5em" }}>
              <Divider maxWidth={"2em"} />
              <Typography>Experiențe Unice</Typography>
            </ListItem>
          </List>
        </CustomBox>
      </CustomBox>
      <CustomBox>
        <CustomBox
          maxWidth={"100em"}
          padding={isSmallScreen ? "1em" : "3em"}
          gap={"1em"}
        >
          <ImageList
            variant={"masonry"}
            gap={16}
            cols={isSmallScreen ? 2 : 3}
            sx={{ alignItems: "center", overflow: "hidden", padding: "1em" }}
          >
            {galleryItems.map((item, index) => (
              <MotionImageListItem
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.01 }}
              >
                <img
                  src={item.src}
                  alt={"Imagine lipsa"}
                  loading={"lazy"}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </MotionImageListItem>
            ))}
          </ImageList>
        </CustomBox>
      </CustomBox>
      <Footer />
      <MobileNavBar />
    </CustomBox>
  );
}

export default AboutPage;
