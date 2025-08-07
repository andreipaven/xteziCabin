import React, { useEffect } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import CustomInputField from "../components/Inputs/CustomInput.jsx";
import CustomTypography from "../components/Containers/CustomTypography.jsx";
import SearchIcon from "@mui/icons-material/Search";
import { fetchGetBookings } from "../Services/bookingService.js";
import { fetchGetWeddingGuests } from "./weddingService.js";

function WeddingPage() {
  const wedding_guests = [];

  useEffect(() => {
    fetchGetWeddingGuests()
      .then((result) => {
        if (result.success) {
          result.result.rows.forEach((guest) => {
            console.log(guest.name);
          });
        } else {
          console.log(result.message);
        }
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
  }, []);

  return (
    <CustomBox>
      <CustomBox maxWidth={"100em"} padding={"1em"}>
        <CustomBox gap={"1em"}>
          <CustomTypography
            fontSize={"2em"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Bine ati venit la nunta!
          </CustomTypography>
          <CustomInputField
            variant={"standard"}
            label={"Nume"}
            inputIcon={<SearchIcon />}
            borderColor={"pink"}
          />
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default WeddingPage;
