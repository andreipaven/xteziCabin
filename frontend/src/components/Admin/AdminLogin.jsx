import React, { useEffect, useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import CustomInputField from "../Inputs/CustomInput.jsx";
import useResponsive from "../Hooks/UseResponsive.jsx";
import themeColors from "../../Theme/themeColors.jsx";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../Buttons/CustomButton.jsx";
import { useNavigate } from "react-router-dom";
import {
  fetchCheckAdmin,
  fetchLoginAdmin,
} from "../../Services/adminServices.js";

function AdminLogin() {
  const { isSmallScreen, isMediumScreen } = useResponsive();
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = async () => {
      const result = await fetchCheckAdmin();
      if (result) {
        navigate("/admin-panel-macarie@23");
      }
    };

    isLoggedIn().catch(console.error);
  }, []);

  const onChangeUsername = (e) => {
    const input = e.target.value;
    setUsernameInput(input);
  };
  const onChangePassword = (e) => {
    const input = e.target.value;
    setPasswordInput(input);
  };

  const submitLogIn = async () => {
    fetchLoginAdmin(usernameInput, passwordInput).then((result) => {
      if (result.success) {
        navigate("/admin-panel-macarie@23");
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <CustomBox height={"100vh"}>
      <CustomBox
        maxWidth={"100em"}
        padding={isSmallScreen ? "1em" : "3em"}
        height={"100%"}
      >
        <CustomBox
          gap={"2em"}
          padding={"2em"}
          height={"100%"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
          }
          width={isSmallScreen ? "100%" : isMediumScreen ? "70%" : "50%"}
          borderRadius={"2em"}
        >
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Login
          </Typography>
          <CustomInputField
            value={usernameInput}
            onChange={(e) => onChangeUsername(e)}
            size={"small"}
            label={"Username"}
            fullWidth={true}
            borderColor={themeColors.palette.secondary.contrastText}
            inputIcon={
              <PersonIcon
                sx={{ color: themeColors.palette.secondary.contrastText }}
              />
            }
          />
          <CustomInputField
            value={passwordInput}
            type={"password"}
            onChange={(e) => onChangePassword(e)}
            size={"small"}
            label={"Password"}
            fullWidth={true}
            borderColor={themeColors.palette.secondary.contrastText}
          />
          {error && (
            <Typography color="error" fontSize={"1em"}>
              {error}
            </Typography>
          )}
          <CustomButton
            width={"100%"}
            value={"Login"}
            color={themeColors.palette.secondary.contrastText}
            border={`2px solid ${themeColors.palette.secondary.contrastText}`}
            fontWeight={"bold"}
            backgroundColorHover={themeColors.palette.secondary.contrastText}
            colorHover={themeColors.palette.primary.contrastText}
            onClick={submitLogIn}
          />
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default AdminLogin;
