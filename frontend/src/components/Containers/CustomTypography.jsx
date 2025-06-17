import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);

function CustomTypography({
  //motion
  animateOnScroll = false,
  animateOnLoad = false,
  animationPreset,
  initial = { opacity: 0, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  viewport = { once: true, amount: 0.2 },
  //mui props & styles
  variant,
  color,
  align,
  children,
  className,
  ...rest
}) {
  const animInitial = animationPreset?.initial || initial;
  const animWhileInView = animationPreset?.whileInView || whileInView;

  return (
    <MotionTypography
      {...(animateOnScroll && {
        initial: animInitial,
        whileInView: animWhileInView,
        transition,
        viewport,
      })}
      {...(animateOnLoad && {
        initial: animInitial,
        animate: animWhileInView,
        transition,
      })}
      {...(!animateOnScroll &&
        !animateOnLoad && {
          initial: undefined,
          animate: undefined,
        })}
      variant={variant}
      color={color}
      align={align}
      className={className}
      {...rest}
    >
      {children}
    </MotionTypography>
  );
}

export default React.memo(CustomTypography);
