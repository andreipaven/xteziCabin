import React from "react";
import { Box, styled, Typography } from "@mui/material";
import bgHomeFirstBox from "../assets/bgHomeFirstBox.webp";
import bgHomeSecondBox from "../assets/bgHomeSecondBox.jpg";
import quotes from "../assets/quotes.png";
import offer1 from "../assets/adventure3.webp";
import offer2 from "../assets/adventure3.webp";
import adventure1 from "../assets/adventure1.jpg";
import adventure2 from "../assets/adventure2.jpg";
import adventure3 from "../assets/adventure3.jpg";
import adventure4 from "../assets/adventure4.jpg";
import Divider from "../components/Details/Divider.jsx";
import CustomBox from "../components/Containers/CustomBox.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MobileNavBar from "../components/NavBars/MobileNavBar.jsx";
import useResponsive from "../components/Hooks/UseResponsive.jsx";
import themeColor from "../Theme/themeColors.jsx";
import Header from "../components/Header/Header.jsx";
import { animationPresets } from "../components/Animations/animationPresets .js";
import { motion } from "framer-motion";
import CustomTypography from "../components/Containers/CustomTypography.jsx";

const HomeBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
}));

const QuoteImg = styled("img")({
  width: "100%",
  maxWidth: "8em",
  height: "auto",
});

const OfferImg = styled("img")(() => ({
  width: "100%",
  maxWidth: "18em",
  height: "auto",
  borderRadius: "1em",
}));
const GalleryImg = motion(
  styled("img")(() => ({
    width: "100%",
    height: "auto",
    maxHeight: "20em",
    objectFit: "cover",
    aspectRatio: "1 / 1",
    borderRadius: "1em",
    display: "block",
  })),
);

function HomePage() {
  const { isSmallScreen, isExtraLargeScreen } = useResponsive();
  return (
    <HomeBox>
      <Header />
      <CustomBox
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgHomeFirstBox})`}
        color={themeColor.palette.primary.contrastText}
        minHeight={"20em"}
        animateOnLoad
        animationPreset={animationPresets.fadeIn}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      >
        <Typography>Relaxare la munte, liniste abosluta</Typography>
        <Typography fontSize={"2em"} fontWeight={"bold"}>
          *****
        </Typography>
        {/*<Button value={"INCHIRIAZA ACUM"}  />*/}
      </CustomBox>
      <CustomBox
        padding={isSmallScreen ? "1em" : "3em 3em"}
        animateOnLoad
        animationPreset={animationPresets.zoom}
      >
        {/*<QuoteImg src={quotes} alt="Quotes icon" />*/}
        <CustomTypography animateOnLoad animationPreset={animationPresets.zoom}>
          "Cabanele noastre nu oferă doar cazare, ci experiențe."
        </CustomTypography>
      </CustomBox>
      <CustomBox
        gap={"1em"}
        padding={isSmallScreen ? "1em" : "3em 3em 6em 3em"}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.5em" }}>
          Ofertele noastre
        </Typography>

        <CustomBox
          display="grid"
          gridTemplateColumns={isSmallScreen ? "1fr" : "1fr 1fr"}
          maxWidth={"100em"}
          gap={"2em"}
          alignItems={"start"}
        >
          <CustomBox
            animateOnScroll
            animationPreset={animationPresets.fadeUp}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
            padding={"1em"}
            borderRadius={"1em"}
            justifyContent={"space-between"}
          >
            {/*<OfferImg src={offer1} alt="Quotes icon" />*/}
            <Typography>
              Super oferta!!! In data de 27-29 iunie 2025 facem reducere 20%
            </Typography>
          </CustomBox>
          <CustomBox
            animateOnScroll
            animationPreset={animationPresets.fadeUp}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
            padding={"1em"}
            borderRadius={"1em"}
            justifyContent={"space-between"}
          >
            {/*<OfferImg src={offer2} alt="Quotes icon" />*/}
            <Typography>
              Aduna-ti prietenii si petreceti la noi cu 10% reducere in wekendul
              acesta!
            </Typography>
          </CustomBox>
        </CustomBox>
      </CustomBox>
      <CustomBox
        alignItems={isExtraLargeScreen ? "end" : "center"}
        color={themeColor.palette.primary.contrastText}
        // backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgHomeSecondBox})`}
        padding={"10em 0em"}
      >
        <CustomBox
          maxWidth={"100em"}
          alignItems={"end"}
          padding={isSmallScreen ? "1em" : "1em 3em"}
          overflow={"hidden"}
        >
          <CustomBox
            width={isSmallScreen ? "100%" : "50%"}
            alignItems={"start"}
            padding={"0em"}
            gap={"1em"}
            animateOnScroll
            animationPreset={
              isSmallScreen
                ? animationPresets.fadeUp
                : animationPresets.fadeRight
            }
          >
            <Typography sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
              Uita de griji
            </Typography>
            <Divider color={themeColor.palette.primary.contrastText} />
            <Typography textAlign={"justify"}>
              Într-un cadru natural spectaculos, se oferă acces la tururi
              ghidate pe trasee montane, plimbări cu ATV-ul, drumeții tematice
              și activități de relaxare precum yoga în aer liber, foc de tabără
              și observare astronomică. Pe timpul iernii, sunt disponibile
              echipamente pentru sporturi de sezon și transfer la pârtii.
              Serviciile includ mic dejun cu produse locale, acces la ciubăr și
              saună, precum și posibilitatea organizării de evenimente private
              sau retreaturi personalizate.
            </Typography>
          </CustomBox>
        </CustomBox>
      </CustomBox>

      <CustomBox
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={"start"}
        maxWidth={"100em"}
        padding={isSmallScreen ? "1em" : "6em 3em"}
        gap={"5em"}
        overflow={"hidden"}
      >
        <CustomBox
          width={isSmallScreen ? "100%" : "40%"}
          alignItems={"start"}
          gap={"1em"}
          animateOnScroll
          animationPreset={
            isSmallScreen ? animationPresets.fadeUp : animationPresets.fadeLeft
          }
        >
          <Typography
            sx={{ fontSize: "1.5em", fontWeight: "bold", textAlign: "start" }}
          >
            Tururi și destinații viitoare
          </Typography>
          <Divider />
          <Typography textAlign={"justify"}>
            Într-un cadru natural spectaculos, se oferă acces la tururi ghidate
            pe trasee montane, plimbări cu ATV-ul, drumeții tematice și
            activități de relaxare precum yoga în aer liber, foc de tabără și
            observare astronomică. Pe timpul iernii, sunt disponibile
            echipamente pentru sporturi de sezon și transfer la pârtii.
            Serviciile includ mic dejun cu produse locale, acces la ciubăr și
            saună, precum și posibilitatea organizării de evenimente private sau
            retreaturi personalizate.
          </Typography>
        </CustomBox>
        <CustomBox
          display="grid"
          gridTemplateColumns={isSmallScreen ? "1fr" : "1fr 1fr"}
          width={isSmallScreen ? "100%" : "60%"}
          gap={"1em"}
        >
          {/*<GalleryImg*/}
          {/*  initial={{ opacity: 0, x: -50 }}*/}
          {/*  whileInView={{ opacity: 1, x: 0 }}*/}
          {/*  viewport={{ once: true, amount: 0.2 }}*/}
          {/*  transition={{ duration: 0.5 }}*/}
          {/*  src={adventure1}*/}
          {/*  alt={"Missing image"}*/}
          {/*/>*/}
          {/*<GalleryImg*/}
          {/*  initial={{ opacity: 0, x: 50 }}*/}
          {/*  whileInView={{ opacity: 1, x: 0 }}*/}
          {/*  viewport={{ once: true, amount: 0.2 }}*/}
          {/*  transition={{ duration: 0.5 }}*/}
          {/*  src={adventure2}*/}
          {/*  alt={"Missing image"}*/}
          {/*/>*/}
          {/*<GalleryImg*/}
          {/*  initial={{ opacity: 0, x: -50 }}*/}
          {/*  whileInView={{ opacity: 1, x: 0 }}*/}
          {/*  viewport={{ once: true, amount: 0.2 }}*/}
          {/*  transition={{ duration: 0.5 }}*/}
          {/*  src={adventure3}*/}
          {/*  alt={"Missing image"}*/}
          {/*/>*/}
          {/*<GalleryImg*/}
          {/*  initial={{ opacity: 0, x: 50 }}*/}
          {/*  whileInView={{ opacity: 1, x: 0 }}*/}
          {/*  viewport={{ once: true, amount: 0.2 }}*/}
          {/*  transition={{ duration: 0.5 }}*/}
          {/*  src={adventure4}*/}
          {/*  alt={"Missing image"}*/}
          {/*/>*/}
        </CustomBox>
      </CustomBox>
      <Footer />
      <MobileNavBar />
    </HomeBox>
  );
}

export default HomePage;
