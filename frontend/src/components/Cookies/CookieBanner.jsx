import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import themeColors from "../../Theme/themeColors.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import "../Styles/Cookies.css";

function CookieBanner() {
  const { isMediumScreen, isSmallScreen } = useResponsive();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <CookieConsent
      enableDeclineButton={true}
      buttonText={"ACCEPT"}
      declineButtonText={"REFUZA"}
      containerClasses={"cookie-banner"}
      style={{
        backgroundColor: themeColors.palette.secondary.contrastText,
        width: isMediumScreen ? "100%" : "50%",
        borderRadius: isMediumScreen ? "0em" : "1em",
        display: "flex",
        alignItems: "center",
        maxWidth: "60em",
        position: "fixed",
        marginBottom: isSmallScreen ? "5.8em" : isMediumScreen ? 0 : "1em",
        left: isMediumScreen ? 0 : "1em",
      }}
      buttonStyle={{
        backgroundColor: themeColors.palette.primary.contrastText,
        fontSize: "1em",
        borderRadius: "11em",
        padding: ".5em 1em",
        fontWeight: "bold",
      }}
      declineButtonStyle={{
        backgroundColor: themeColors.palette.secondary.contrastText,
        color: themeColors.palette.primary.contrastText,
        border: `2px solid ${themeColors.palette.primary.contrastText}`,
        fontSize: "1em",
        borderRadius: "12em",
        padding: ".5em 1em",
        fontWeight: "bold",
      }}
      contentStyle={{
        alignItems: "start",
      }}
    >
      Folosim cookie-uri pe site-ul nostru web pentru a vă oferi cea mai
      relevantă experiență, amintindu-vă preferințele și repetând vizitele. Dând
      clic pe „ACCEPT”, sunteți de acord cu utilizarea a TOATE cookie-urilor.
    </CookieConsent>
  );
}

export default CookieBanner;
