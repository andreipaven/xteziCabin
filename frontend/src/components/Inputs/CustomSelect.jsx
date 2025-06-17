import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
export default function CustomSelect({
  size,
  label,
  value,
  onChange,
  borderColor, // This prop will control the border color
  options = [],
  width,
  fullWidth,
  variant,
  iconComponent,
  defaultValue,
  ...rest
}) {
  return (
    <FormControl
      size={size}
      variant={variant || "outlined"}
      fullWidth={fullWidth}
      sx={{
        width: width,
        // Target the notched outline for various states
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor, // Default border color
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor, // Border color on hover
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: borderColor, // Border color when focused
        },
        // Target the label color
        "& .MuiInputLabel-root": {
          color: borderColor, // Label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: borderColor, // Label color when focused
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: borderColor,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: borderColor,
        },
      }}
      {...rest}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        variant={variant || "outlined"}
        label={label}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        IconComponent={iconComponent || StarIcon}
        sx={{
          "& .MuiSelect-icon": {
            color: borderColor,
          },
          "& .MuiSelect-icon.MuiSelect-iconOpen": {
            transform: "none !important",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
