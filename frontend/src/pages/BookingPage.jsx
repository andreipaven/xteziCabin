import React, { useEffect, useState } from "react";
import DateDayPicker from "../components/Calendar/DateDayPicker.jsx";
import CustomBox from "../components/Containers/CustomBox.jsx";
import useResponsive from "../components/Hooks/UseResponsive.jsx";
import themeColors from "../Theme/themeColors.jsx";
import { Typography } from "@mui/material";
import CustomButton from "../components/Buttons/CustomButton.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import Footer from "../components/Footer/Footer.jsx";
import MobileNavBar from "../components/NavBars/MobileNavBar.jsx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Rental from "../models/Rental.js";
import PersonIcon from "@mui/icons-material/Person";
import CustomSelect from "../components/Inputs/CustomSelect.jsx";
import { fetchAddBooking } from "../Services/bookingService.js";
import {
  driveToRight,
  sleepFloat,
  smokeToLeft,
} from "../components/Keyframes/keyFrames.jsx";
import Header from "../components/Header/Header.jsx";
import "../components/Styles/BookingPage.css";
import { Slide } from "react-toastify";
import DefaultNotification from "../components/Notifications/DefaultNotification.jsx";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../components/Notifications/notifications.js";
import { fetchSendBookingEmail } from "../Services/emailServices.js";
import { generateBookingConfirmationEmail } from "../components/Emails/bookingEmailTemplate.js";
import { animationPresets } from "../components/Animations/animationPresets .js";

function BookingPage() {
  const { isSmallScreen, isMediumScreen } = useResponsive();

  const [totalPrice, setTotalPrice] = useState(0);
  const [numberNights, setNumberNights] = useState(0);

  // range date selected
  const [selected, setSelected] = useState({ from: null, to: null });

  const optionsForNumberMembersSelect = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
  ];

  // inputs fields

  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputValueNumberPeoples, setInputValueNumberPeoples] = useState(null);

  const [uiError, setUiError] = useState(0);

  const [errors, setErrors] = useState({
    email: false,
    phone: null,
    firstName: false,
    lastName: false,
    numberPeoples: false,
    dates: false,
  });

  const priceNight = 125;

  function validateForm() {
    const rental = new Rental({
      lastName: inputLastName,
      firstName: inputFirstName,
      email: inputEmail,
      phone: inputPhoneNumber,
      startDate: selected?.from,
      endDate: selected?.to,
      numberPeoples: inputValueNumberPeoples,
      price: totalPrice,
      status: "pending",
    });

    const newErrors = {
      email: !rental.validateEmail(),
      firstName: !rental.validateFirstName().valid,
      lastName: !rental.validateLastName().valid,
      phone: rental.validatePhoneNumber().error || null,
      numberPeoples: !rental.validateNumberPeoples(),
      dates: !rental.validateDates(),
    };

    setErrors(newErrors);

    return { errorsA: newErrors, rentalA: rental };
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      console.log("scroll sus");
    }, 100);
  }, []);

  useEffect(() => {
    if (selected?.from && selected?.to) {
      const diffTime = Math.abs(selected.to - selected.from);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberNights(nights);
      if (inputValueNumberPeoples > 0) {
        setTotalPrice(nights * priceNight * inputValueNumberPeoples);
      }
    } else {
      setNumberNights(0);
      setTotalPrice(0);
    }
  }, [selected, inputValueNumberPeoples]);

  function onChangeNumberPeoples(e) {
    const input = e.target.value;

    if (/^\d*$/.test(input)) {
      if (input === "") {
        setInputValueNumberPeoples("");
      } else {
        setInputValueNumberPeoples(parseInt(input, 10));
      }
    }
  }

  function onChangeEmail(e) {
    setInputEmail(e.target.value);
  }

  function onChangeFirstName(e) {
    const input = e.target.value;
    setInputFirstName(input.replace(/[^a-zA-Z]/g, ""));
  }

  const onChangeLastName = (e) => {
    const input = e.target.value;
    setInputLastName(input.replace(/[^a-zA-Z]/g, ""));
  };

  useEffect(() => {
    if (uiError === 1) {
      validateForm();
    }
  }, [
    inputEmail,
    inputPhoneNumber,
    inputValueNumberPeoples,
    inputFirstName,
    inputLastName,
    selected,
    uiError,
  ]);

  const submitReservation = async () => {
    setUiError(1);
    const { errorsA, rentalA } = validateForm();

    if (
      !errorsA.email &&
      errorsA.phone === null &&
      !errorsA.numberPeoples &&
      !errorsA.dates &&
      !errorsA.firstName &&
      !errorsA.lastName
    ) {
      if (rentalA !== null) {
        const bookingData = {
          firstName: rentalA.firstName,
          lastName: rentalA.lastName,
          email: rentalA.email,
          phone: rentalA.phone,
          startDate: rentalA.startDate.toLocaleString("en-US"),
          endDate: rentalA.endDate.toLocaleString("en-US"),
          numberPeoples: rentalA.numberPeoples,
          price: rentalA.price,
          status: rentalA.status,
        };

        const reservation = {
          name: bookingData.firstName + " " + bookingData.lastName,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          price: bookingData.price,
          persons: bookingData.numberPeoples,
        };
        const messageEmail = generateBookingConfirmationEmail(reservation);

        fetchAddBooking(bookingData).then((result) => {
          if (result.success) {
            notify(result.message);
            fetchSendBookingEmail(inputEmail, messageEmail).then(
              (resultEmail) => {
                if (resultEmail.success) {
                  setTimeout(() => {
                    notify(" Am trimis un email de confirmare!");
                    setTimeout(() => {
                      window.location.reload();
                    }, 2500);
                  }, 2000);
                } else {
                  console.log("Error to sent booking");
                  console.log(resultEmail);
                }
              },
            );
          } else {
            console.log("Error to sent booking");
            console.log(result);
          }
        });
      }
    } else {
      console.log("There are errors, submission is not possible");
    }
  };

  return (
    <CustomBox
      backgroundColor={themeColors.palette.primary.dark}
      height={"100%"}
      justifyContent={"start"}
    >
      <Header />
      <CustomBox
        maxWidth={"100em"}
        padding={isSmallScreen ? "1em" : "3em"}
        gap={"2em"}
        flexDirection={isMediumScreen ? "column" : "row"}
        alignItems={"start"}
        animateOnLoad
        animationPreset={animationPresets.zoom}
      >
        <DateDayPicker onSelectDate={setSelected} />

        {selected && selected.from && selected.to ? (
          <CustomBox
            className={"fade-in"}
            backgroundColor={themeColors.palette.primary.contrastText}
            borderRadius={"3em 1em"}
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            }
            padding={isMediumScreen ? "1em" : "1em 3em"}
            gap={".5em"}
          >
            <Typography fontWeight={"bold"}>Perioada de rezervare</Typography>
            <CustomBox flexDirection={"row"} justifyContent={"start"}>
              <Typography
                sx={{
                  animation: `${smokeToLeft} 3s infinite`,

                  transform: "scaleX(-1)",
                }}
              >
                💨
              </Typography>
              <Typography
                sx={{
                  transform: "scaleX(-1)",
                  display: "inline-block",
                  animation: `${driveToRight} 3s infinite`,
                  marginLeft: "-5px",
                  width: "50%",
                  textAlign: "end",
                  fontSize: "1.3em",
                }}
              >
                🚗
              </Typography>
            </CustomBox>
            <CustomBox gap={"1em"} alignItems={"start"}>
              <CustomBox
                width={"100%"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                padding={errors.dates ? " 0em .5em " : "0em"}
                border={errors.dates ? "2px solid red" : "none"}
                borderRadius={".5em"}
              >
                <Typography>
                  <b>Din:</b> {selected.from.toLocaleDateString()}
                </Typography>
                <Typography
                  fontSize={".8em"}
                  flex={1}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <span>🔜</span>
                  <span>🎯</span>
                </Typography>
                <Typography>
                  <b>Pana in:</b> {selected.to.toLocaleDateString()}
                </Typography>
              </CustomBox>
              {errors.dates && (
                <Typography sx={{ color: themeColors.palette.error.main }}>
                  Trebuie sa selectati cel putin doua zile
                </Typography>
              )}
              <CustomBox width={"auto"} flexDirection={"row"}>
                <Typography
                  borderBottom={errors.dates ? "2px solid red" : "none"}
                >
                  <b>Nopți:</b> {numberNights}
                </Typography>

                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: "1.5em",
                    animation: `${sleepFloat} 3s infinite ease-in-out`,
                    ml: ".2em",
                  }}
                >
                  💤
                </Typography>
              </CustomBox>

              <CustomSelect
                variant={"standard"}
                borderColor={
                  errors.numberPeoples
                    ? themeColors.palette.error.main
                    : themeColors.palette.secondary.contrastText
                }
                size={"small"}
                fullWidth={true}
                label={"Numar persoane"}
                value={inputValueNumberPeoples ?? ""}
                onChange={onChangeNumberPeoples}
                options={optionsForNumberMembersSelect}
                iconComponent={GroupsIcon}
              />
              {errors.numberPeoples && (
                <Typography sx={{ color: themeColors.palette.error.main }}>
                  Camp obligatoriu.
                </Typography>
              )}

              <CustomInputField
                type={"text"}
                variant={"standard"}
                size={"small"}
                label={"Prenume"}
                value={inputFirstName}
                inputIcon={
                  <PersonIcon
                    style={{
                      fill: errors.firstName
                        ? themeColors.palette.error.main
                        : themeColors.palette.secondary.contrastText,
                    }}
                  />
                }
                borderColor={
                  errors.firstName
                    ? themeColors.palette.error.main
                    : themeColors.palette.secondary.contrastText
                }
                fullWidth={true}
                onChange={onChangeFirstName}
              />
              {errors.firstName && (
                <Typography style={{ color: "red" }}>
                  Prenumele este obligatoriu.
                </Typography>
              )}
              <CustomInputField
                type={"text"}
                variant={"standard"}
                size={"small"}
                label={"Nume"}
                value={inputLastName}
                inputIcon={
                  <PersonIcon
                    style={{
                      fill: errors.lastName
                        ? themeColors.palette.error.main
                        : themeColors.palette.secondary.contrastText,
                    }}
                  />
                }
                borderColor={
                  errors.lastName
                    ? themeColors.palette.error.main
                    : themeColors.palette.secondary.contrastText
                }
                fullWidth={true}
                onChange={onChangeLastName}
              />
              {errors.lastName && (
                <Typography style={{ color: "red" }}>
                  Numele este obligatoriu.
                </Typography>
              )}
              <CustomInputField
                size={"small"}
                type={"email"}
                variant={"standard"}
                label={"E-mail"}
                value={inputEmail}
                onChange={onChangeEmail}
                inputIcon={
                  <EmailIcon
                    style={{
                      fill: errors.email
                        ? themeColors.palette.error.main
                        : themeColors.palette.secondary.contrastText,
                    }}
                  />
                }
                borderColor={
                  errors.email
                    ? themeColors.palette.error.main
                    : themeColors.palette.secondary.contrastText
                }
                fullWidth={true}
              />
              {errors.email && (
                <Typography style={{ color: "red" }}>Email invalid.</Typography>
              )}
              <PhoneInput
                placeholder={"Telefon"}
                defaultCountry="RO"
                value={inputPhoneNumber}
                onChange={setInputPhoneNumber}
                fontSize={"1em"}
                international
              />
              {errors.phone && (
                <Typography style={{ color: "red" }}>{errors.phone}</Typography>
              )}
              <CustomBox width={"auto"} flexDirection={"row"}>
                <b>Total:</b> {totalPrice}
                <Typography sx={{ ml: ".3em" }}>RON</Typography>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: "1.5em",
                  }}
                >
                  💸
                </Typography>
              </CustomBox>
            </CustomBox>
            <CustomButton
              maxWidth={"20em"}
              backgroundColor={themeColors.palette.success.light}
              border={"none"}
              value={"Rezerva acum"}
              color={themeColors.palette.primary.contrastText}
              fontWeight={"bold"}
              padding={"1em"}
              borderRadius={"5em"}
              width={"100%"}
              backgroundColorHover={themeColors.palette.success.dark}
              onClick={submitReservation}
            />
          </CustomBox>
        ) : (
          <Typography textAlign={"center"} width={"100%"}>
            Alege o perioadă pentru rezervare
          </Typography>
        )}
      </CustomBox>
      <Footer />
      <MobileNavBar />
      <DefaultNotification
        position="top-right"
        autoClose={2000}
        transition={Slide}
        theme={isSmallScreen ? "dark" : "light"}
      />
    </CustomBox>
  );
}

export default BookingPage;
