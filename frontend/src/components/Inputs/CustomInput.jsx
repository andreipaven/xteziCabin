import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CustomInputField({
  size,
  label,
  type,
  inputIcon,
  borderColor,
  onChange,
  value,
  width,
  fullWidth,
  defaultValue,
  backgroundColor,
  variant,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(type === "password");
  const [inputType, setInputType] = useState(type || "text");

  const switchType = () => {
    setShowPassword((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <TextField
      size={size}
      label={label}
      type={inputType}
      variant={variant || "outlined"}
      width={width}
      fullWidth={fullWidth}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      {...rest}
      sx={{
        backgroundColor: backgroundColor,
        "& .MuiOutlinedInput-root": {
          borderRadius: ".2em",

          "&:hover fieldset": { borderColor: borderColor },
          "&.Mui-focused fieldset": {
            borderColor: borderColor,
          },
          "& fieldset": {
            borderColor: borderColor,
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: borderColor,
        },
        "& .MuiInputLabel-root": {
          color: borderColor,
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: borderColor,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: borderColor,
        },
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {type === "password" ? (
              <IconButton
                size="small"
                onClick={switchType}
                edge="end"
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                {!showPassword ? (
                  <VisibilityOff sx={{ color: borderColor }} />
                ) : (
                  <Visibility sx={{ color: borderColor }} />
                )}
              </IconButton>
            ) : (
              inputIcon
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
