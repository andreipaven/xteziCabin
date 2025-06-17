import React, { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledImage = styled("img")(({ width, height, maxWidth, maxHeight }) => ({
  width: width || "100%",
  height: height || "100%",
  maxWidth: maxWidth,
  maxHeight: maxHeight,
  objectFit: "cover",
  display: "block",
}));

function LoadImage({
  src,
  alt = "image",
  fallback = "/fallback.png",
  width,
  height,
  className = "",
  ...rest
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return (
    <StyledImage
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      width={width}
      height={height}
      className={className}
      {...rest}
      sx={{
        ...rest,
      }}
    />
  );
}

export default LoadImage;
