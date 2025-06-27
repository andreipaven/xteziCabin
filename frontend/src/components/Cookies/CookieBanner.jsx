import React from "react";
import CookieConsent from "react-cookie-consent";
import themeColors from "../../Theme/themeColors.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";

function CookieBanner() {
  const { isMediumScreen } = useResponsive();
  return (
    <CookieConsent
      enableDeclineButton={true}
      buttonText={"ACCEPT"}
      declineButtonText={"REFUZA"}
      style={{
        backgroundColor: themeColors.palette.secondary.contrastText,
        width: isMediumScreen ? "100%" : "50%",
        borderRadius: isMediumScreen ? "0em" : "1em",
        margin: isMediumScreen ? "0em " : "1em",
        display: "flex",
        alignItems: "center",
        maxWidth: "60em",
      }}
      buttonStyle={{
        backgroundColor: themeColors.palette.primary.contrastText,
        fontSize: "1.5em",
        borderRadius: "1em",
        padding: ".5em",
      }}
      declineButtonStyle={{
        backgroundColor: themeColors.palette.secondary.contrastText,
        color: themeColors.palette.primary.contrastText,
        border: `2px solid ${themeColors.palette.primary.contrastText}`,
        fontSize: "1.5em",
        borderRadius: "1em",
        padding: ".5em",
      }}
      contentStyle={{
        alignItems: "start",
      }}
    >
      Folosim cookie-uri pe site-ul nostru web pentru a vă oferi cea mai
      relevantă experiență, amintindu-vă preferințele și repetând vizitele. Dând
      clic pe „Accept”, sunteți de acord cu utilizarea a TOATE cookie-urilor.
    </CookieConsent>
  );
}

export default CookieBanner;
