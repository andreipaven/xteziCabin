import React from "react";
import { Box } from "@mui/material";
import themeColor from "../../Theme/themeColors.jsx";

function Divider({ maxWidth, color, ml, height, opacity }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: maxWidth || "5em",
        height: height || ".2em",
        backgroundColor: color ?? themeColor.palette.secondary.contrastText,
        borderRadius: ".2em",
        ml: ml,
        opacity: opacity,
      }}
    />
  );
}

export default Divider;
